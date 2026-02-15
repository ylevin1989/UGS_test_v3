# Инструкция по деплою на VPS (Ubuntu 22.04+)

Эта инструкция поможет вам запустить проект на вашем сервере с использованием Nginx и PM2.

## 1. Подготовка сервера

Подключитесь к VPS через SSH и выполните команды:

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js (рекомендуется через nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Установка PM2 и Nginx
npm install -g pm2
sudo apt install -y nginx
```

## 2. Клонирование и сборка проекта

```bash
# Клонируйте репозиторий (замените на свой путь, если нужно)
git clone https://github.com/ylevin1989/UGS.git
cd UGS/ugc-agency

# Установка зависимостей
npm install

# Создание файла окружения
cp .env.example .env.local
# Отредактируйте .env.local (укажите токен бота и chat_id)
# nano .env.local

# Сборка проекта
npm run build
```

## 3. Запуск через PM2

Мы подготовили файл `pm2.config.js` для удобного управления:

```bash
pm2 start pm2.config.js
pm2 save
pm2 startup
```

## 4. Настройка Nginx

Создайте конфиг для вашего домена:

```bash
sudo nano /etc/nginx/sites-available/ugs-agency
```

Вставьте следующий текст (замените `your-domain.com` на ваш реальный домен):

```nginx
server {
    listen 80;
    server_name ugs.uno-ai.pw;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфиг и перезапустите Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/ugs-agency /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Настройка SSL (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d ugs.uno-ai.pw
```

---

### Важное примечание по Admin Panel (`content.json`)
Файл `data/content.json` используется для хранения настроек. При каждом `git pull` изменения, сделанные через админку на сервере, могут быть перезаписаны. 

**Рекомендация:**
Чтобы сохранить изменения, перед обновлением кода делайте бэкап файла:
```bash
cp data/content.json data/content.json.bak
git pull
cp data/content.json.bak data/content.json
npm run build
pm2 restart ugc-agency
```
