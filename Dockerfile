# Використовуємо PHP 8.1 з FPM
FROM php:8.1-fpm

# Встановлюємо PostgreSQL-драйвери
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

# Встановлюємо робочу директорію (основна папка проєкту)
WORKDIR /var/www/html

# Копіюємо всі файли в контейнер
COPY . .

# Запускаємо вбудований сервер PHP (порт 8000)
CMD ["php", "-S", "0.0.0.0:8000"]
