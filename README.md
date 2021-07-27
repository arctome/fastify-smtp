## Usage

### Docker

```bash
docker run --name my-smtp-api -v /path/to/your/.env:/usr/src/app/.env fastify-smtp:latest
```

> You must mount a correct `.env` file, or docker will exit.

### PM2

Create 2 instances by default automatically.

```bash
# npm install -g pm2
pm2 start pm2.json
```

## Configs

### General configs
- PORT=3000

### configs for `nodemailer` (https://nodemailer.com/)
- NODEMAILER_PRESET_SERVICE=
- NODEMAILER_SMTP_HOST=
- NODEMAILER_SMTP_PORT=
- NODEMAILER_SMTP_SECURE=
- NODEMAILER_SMTP_AUTH_USER=
- NODEMAILER_SMTP_AUTH_PASS=
- NODEMAILER_SMTP_AUTH_TYPE=
- NODEMAILER_SMTP_SEND_FROM=
- NODEMAILER_SMTP_SEND_SENDER=


### configs for Sentry
- SENTRY_ENABLE=false
- SENTRY_DSN=