## Установка проекта и настройка на VPS с Ubuntu 22.04.2

### Установка Nginx

1. Обновите пакеты сервера:

```bash
sudo apt-get update
sudo apt-get upgrade
```

2. Установите Nginx:

```bash
sudo apt-get install nginx
```

### Установка Node.js и NVM

1. Установите Node Version Manager (NVM):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

2. Установите Node.js, используя NVM:

```bash
nvm install node
```

### Установка и запуск приложений Nest и Next

1. Клонируйте ваш репозиторий на сервер:

```bash
git clone your-repository-url
```

2. Перейдите в директорию каждого из приложений и установите зависимости:

```bash
cd your-app-directory
npm install
```

3. Запустите приложения в режиме production:

```bash
npm run start:prod
```

### Настройка Nginx

1. Откройте конфигурационный файл Nginx:

```bash
sudo nano /etc/nginx/sites-available/default
```

2. Настройте его в соответствии с вашими потребностями:

```bash

server {
    listen 80;
    server_name  your-domain.com;

    return 301 https://your-domain.com;
}

server {
    listen 443 ssl;
    server_name  your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


```

3. Проверьте конфигурацию на ошибки:

```bash
sudo nginx -t
```

4. Если все в порядке, перезапустите Nginx:

```bash
sudo systemctl restart nginx
```




---
## Установка и настройка PostgreSQL на Ubuntu

### Установка PostgreSQL

1. Обновите пакеты сервера и установите PostgreSQL и вспомогательные пакеты:

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### Проверка статуса PostgreSQL

1. Проверьте, что служба PostgreSQL активна и работает:

```bash
sudo systemctl status postgresql
```

### Вход в интерактивную оболочку PostgreSQL

1. Войдите в интерактивную оболочку PostgreSQL:

```bash
sudo -i -u postgres
psql
```

### Создание пользователя и базы данных

1. Создайте нового пользователя и базу данных:

```bash
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
CREATE DATABASE mydatabase OWNER myuser;
```

Замените `myuser` и `mypassword` на желаемые имя пользователя и пароль, а `mydatabase` на желаемое имя базы данных.

Если нужно перенести базу данных, то копируем дамп базы в корневую деррикторию, переходим туда и под пользователем postgres восстанавливаем дамп в 
новую базу данных mydatabase с помощью команды:

```bash
    pg_restore -U postgres -d mydatabase olddatabase.back
```

### Проверка создания базы данных

1. Проверьте, что база данных создана, используя команду `\l`.

### Выход из оболочки PostgreSQL

1. Выйдите из оболочки PostgreSQL:

```bash
\q
exit
```

### Вы можете изменить пароль пользователя PostgreSQL с помощью следующих шагов:

1. Первым делом нужно зайти в командную строку PostgreSQL. Откройте терминал и введите следующую команду:

   ```bash
   sudo -u postgres psql
   ```
   
2. После входа в командную строку PostgreSQL, введите следующую команду для смены пароля пользователя `postgres`:

   ```sql
   \password postgres
   ```

3. Вам будет предложено ввести новый пароль дважды для подтверждения. После ввода нового пароля, введите команду `\q` для выхода из командной строки PostgreSQL.

Эти шаги помогут вам изменить пароль пользователя `postgres` в PostgreSQL. Помните, что нужно сохранить новый пароль в надёжном месте, чтобы избежать потери доступа к вашей базе данных.


---
Пожалуйста, подставьте реальные значения вместо `myuser`, `mypassword` и `mydatabase`, и добавьте любую дополнительную информацию, которую вы считаете необходимой.

Важно: Не забудьте обновить файлы конфигурации своих приложений в соответствии с настройками вашего сервера, включая базу данных, ключи API и прочее.

---
Пожалуйста, подставьте реальные значения вместо `your-repository-url`, `your-app-directory`, `your-domain.com` и `YOUR_APP_PORT`, и добавьте любую дополнительную информацию, которую вы считаете необходимой.

---

## Дополнительная настройка PostgreSQL для удаленного доступа

Возможно, сервер PostgreSQL настроен так, чтобы принимать соединения только из определенных сетей или хостов. Или ваш сервер может блокировать входящие соединения на порту 5432 через межсетевой экран.

### Проверка и настройка PostgreSQL

1. На сервере, где запущен PostgreSQL, найдите файл `postgresql.conf` (обычно он находится в каталоге `/etc/postgresql/{версия PostgreSQL}/main/` или `/var/lib/pgsql/{версия PostgreSQL}/data`). 

2. В этом файле найдите строку со следующим параметром:

    ```bash
    listen_addresses = 'localhost'
    ```

    и замените её на:

    ```bash
    listen_addresses = '*'
    ```

Это позволит серверу принимать соединения с любого IP-адреса.

3. Обновите файл `pg_hba.conf`, который находится в том же каталоге, что и `postgresql.conf`. Добавьте следующую строку в конец файла:

    ```bash
    host    all             all             0.0.0.0/0               md5
    ```

Это позволит любому IP-адресу подключиться к любой базе данных и любому пользователю, если он знает пароль.

4. После того, как вы сделаете эти изменения, перезапустите PostgreSQL:

    ```bash
    sudo service postgresql restart
    ```

### Проверка и настройка межсетевого экрана

Важно также убедиться, что ваш сервер не блокирует TCP-соединения на порту 5432. Проверьте и при необходимости обновите правила межсетевого экрана. Например, если вы используете `ufw` для управления межсетевым экраном, вы можете разрешить входящие соединения на порту 5432 командой:

```bash
sudo ufw allow 5432
```

После всех этих настроек вы должны иметь возможность подключиться к серверу PostgreSQL через pgAdmin, используя IP-адрес вашего сервера и порт 5432.

---

Пожалуйста, обратите внимание, что настройка удаленного доступа к базе данных может представлять риски для безопасности. Убедитесь, что вы принимаете необходимые меры безопасности, включая использование безопасных паролей, ограничение доступа по IP, использование шифрования и т.д.


---
## Настройка PM2.

1. **Установите PM2**:

    После того как вы установили Node.js с помощью NVM, установите PM2:
    ```bash
    npm install -g pm2
    ```

2. **Настройка приложений для работы с PM2**:

    Вы должны создать файл конфигурации для каждого из ваших приложений. Это JSON файлы, которые сообщают PM2 как запустить и управлять вашими приложениями.

    Для серверного приложения создайте файл с именем `ecosystem.config.server.js` (файл ecosystem.config.client.js обычно размещается в корневой директории вашего приложения) и следующим содержимым:
    ```javascript
    module.exports = {
        apps : [{
            name: "server",
            script: "npm",
            args: "start",
            cwd: "/путь/до/вашей/папки/cplatform/server"
        }]
    }
    ```

    Для клиентского приложения создайте файл с именем `ecosystem.config.client.js` и следующим содержимым:
    ```javascript
    module.exports = {
        apps : [{
            name: "client",
            script: "npm",
            args: "start",
            cwd: "/путь/до/вашей/папки/cplatform/client"
        }]
    }
    ```

    Замените `/путь/до/вашей/папки` на абсолютный путь до папки `cplatform`.
    Вы можете использовать команду pwd (print working directory) в Linux для того, чтобы узнать текущий рабочий каталог в командной строке.

   

4. **Запуск приложений с PM2**:

    Чтобы запустить ваше приложение с PM2, используйте следующую команду:
    ```bash
    pm2 start ecosystem.config.server.js
    pm2 start ecosystem.config.client.js
    ```
    Есть вероятность что не будут видны порты при первом запуске. Тогда нужно сохранить текущую конфигурацию см. п.5 и перезапустить сервер.
    Теперь PM2 запустит ваше приложение и будет автоматически перезапускать его, если оно упадет или если сервер перезагрузится.

5. **Настройка автозапуска с PM2**:

    PM2 может автоматически запускать ваши приложения при старте сервера. Чтобы настроить это, используйте следующую команду:
    ```bash
    pm2 startup
    ```

    PM2 выведет команду, которую вы должны скопировать и вставить в терминал. Это установит PM2 в качестве службы systemd и позволит ей запускаться при старте системы.

    Затем сохраните текущую конфигурацию PM2 следующей командой, чтобы PM2 знала, какие приложения запускать при старте:
    ```bash
    pm2 save
    ```

Теперь ваши приложения будут автоматически запускаться при перезагрузке сервера, а PM2 будет следить за ними и перезапускать, если они упадут.
