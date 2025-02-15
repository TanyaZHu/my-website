# Використовуємо PHP 8.1 + Apache
FROM php:8.1-apache

# Встановлюємо необхідні розширення для PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

# Копіюємо файли у контейнер
COPY . /var/www/html/

# Виставляємо стандартний порт
EXPOSE 10000

# Запускаємо Apache
CMD ["apache2-foreground"]
