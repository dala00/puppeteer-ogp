# Puppeteer OGP

OPG generating server application with Puppeteer.

## Getting Started

Configure .env

```
BASE_URL=https://your.website
IMAGE_WIDTH=600
IMAGE_HEIGHT=315
URL_FILTER=/articles,/posts
```

### Development

You can use docker-compose

```
docker-compose up -d
```

Install dependencies

```
docker-compose exec app bash
yarn
```

And start server

```
npm start
```

If you access `http://localhost:3000/path/to/page.png`, Screenshot of `https://your.website/path/to/page` is rendered.

### Deployment

Install npm and yarn and google-chrome.

Dockerfile contains installation sample for google-chrome. (Chrome Driver may not be needed)

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn
```

#### Systemd

Service sample.

/etc/systemd/system/ogp.service

```
[Unit]
Description=ogp server
After=syslog.target network.target

[Service]
Type=simple
ExecStart=/usr/bin/npm start
WorkingDirectory=/path/to/puppeteer-ogp
KillMode=mixed
Restart=always
User=yourname
Group=yourgroup

[Install]
WantedBy=multi-user.target
```

Enable service and start

```
sudo systemctl enable ogp
sudo service ogp start
```

#### Nginx

If you use SSL and 80 port, it's easy to use Nginx.

```config
        listen 443 ssl default_server;
        ssl_certificate /etc/letsencrypt/live/ogp.example.net/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/ogp.example.net/privkey.pem;

        server_name ogp.example.net;

        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        location ^~ /.well-known/ {
                root /var/www/html;
        }

        location / {
                proxy_pass http://localhost:3000/;
        }
```

## Contribution

Feel free to create issue or PR.
