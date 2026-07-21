# Linux VM Deployment Guide

This guide covers deploying ballsackOS to a Linux virtual machine.

## Server Requirements

- **OS:** Ubuntu 22.04 LTS (recommended) or Debian 12
- **CPU:** 2+ cores
- **RAM:** 4GB minimum, 8GB recommended
- **Storage:** 20GB minimum
- **Network:** Static IP or domain name

## Initial Server Setup

### 1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Create Application User

```bash
sudo adduser ballsackos
sudo usermod -aG sudo ballsackos
```

### 3. Configure Firewall

```bash
sudo apt install ufw
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 4. Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:
```bash
node --version  # Should be v20.x.x
npm --version
```

### 5. Install PostgreSQL 15

```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Create database and user:
```bash
sudo -u postgres psql

CREATE USER ballsackos WITH PASSWORD 'your-secure-password';
CREATE DATABASE ballsackos OWNER ballsackos;
GRANT ALL PRIVILEGES ON DATABASE ballsackos TO ballsackos;
\q
```

### 6. Install Nginx

```bash
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 7. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

## Application Deployment

### 1. Clone Repository

```bash
su - ballsackos
git clone https://github.com/josephas-llc/ballsackOS.git
cd ballsackOS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
nano .env
```

Set production values:
```bash
# Database
DATABASE_URL="postgresql://ballsackos:your-secure-password@localhost:5432/ballsackos"

# Auth
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://yourdomain.com"

# Other settings...
```

### 4. Generate Prisma Client & Migrate

```bash
npx prisma generate
npx prisma migrate deploy
```

### 5. Build Application

```bash
npm run build
```

### 6. Start with PM2

```bash
pm2 start npm --name "ballsackos" -- start
pm2 save
pm2 startup  # Follow the instructions to enable auto-start
```

### 7. Configure Nginx

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/ballsackos
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ballsackos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically configure SSL and set up auto-renewal.

## Maintenance

### Deploying Updates

```bash
cd ~/ballsackOS
git pull
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart ballsackos
```

### Viewing Logs

```bash
# Application logs
pm2 logs ballsackos

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Backups

Create a backup script:
```bash
nano ~/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/ballsackos/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
pg_dump -U ballsackos ballsackos > $BACKUP_DIR/ballsackos_$TIMESTAMP.sql
# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

```bash
chmod +x ~/backup-db.sh
```

Add to cron for daily backups:
```bash
crontab -e
# Add this line:
0 2 * * * /home/ballsackos/backup-db.sh
```

### Monitoring

#### PM2 Monitoring
```bash
pm2 status
pm2 monit
```

#### System Resources
```bash
htop
df -h
free -m
```

## Security Hardening

### 1. SSH Key Authentication

```bash
# On your local machine
ssh-keygen -t ed25519 -C "your-email@example.com"
ssh-copy-id ballsackos@your-server-ip

# On the server, disable password auth
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
sudo systemctl restart sshd
```

### 2. Fail2Ban

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

### 3. Automatic Security Updates

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 4. PostgreSQL Security

Edit PostgreSQL config:
```bash
sudo nano /etc/postgresql/15/main/pg_hba.conf
```

Ensure only local connections are allowed:
```
local   all   all                   peer
host    all   all   127.0.0.1/32    scram-sha-256
```

## Scaling Considerations

### Horizontal Scaling

For high traffic, consider:
1. Load balancer (Nginx, HAProxy)
2. Multiple application servers
3. Read replicas for PostgreSQL
4. Redis for session storage

### CDN

For static assets and global performance:
1. CloudFlare
2. AWS CloudFront
3. Vercel Edge Network

## Troubleshooting

### Application won't start

```bash
pm2 logs ballsackos --lines 100
```

### Database connection issues

```bash
# Test connection
psql -U ballsackos -d ballsackos -h localhost

# Check PostgreSQL status
sudo systemctl status postgresql
```

### Nginx 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Out of memory

```bash
# Check memory usage
free -m

# Add swap if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Related Documentation

- [Installation Guide](/docs/setup/INSTALLATION.md)
- [Tech Stack](/docs/architecture/TECH_STACK.md)
- [Issue #17: Deployment & CI/CD](../../issues/17)
