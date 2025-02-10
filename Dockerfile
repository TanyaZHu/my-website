# Використовуємо PHP 8.1 без Apache
FROM php:8.1-fpm

# Встановлюємо PostgreSQL-драйвери
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

# Встановлюємо робочу директорію
WORKDIR /var/www/html

# Копіюємо файли у контейнер
COPY . .

# Запускаємо PHP-сервер (порт 8000)
CMD ["php", "-S", "0.0.0.0:8000", "-t", "my-website-main"]
