# Використовуємо PHP 8.1 з Apache
FROM php:8.1-apache

# Встановлюємо розширення для PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

# Виправляємо помилку ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Копіюємо файли проєкту
COPY . /var/www/html/

# Дозволяємо .htaccess
RUN a2enmod rewrite

# Відкриваємо правильний порт для Koyeb (8080)
EXPOSE 8080

# Запускаємо Apache
CMD ["apache2-foreground"]
