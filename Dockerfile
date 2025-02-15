# Використовуємо PHP 8.1 з Apache
FROM php:8.1-apache

# Встановлюємо розширення для PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

# Виправляємо помилку ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Налаштовуємо Apache на 8080 (обов'язково для Koyeb)
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
RUN sed -i 's/:80/:8080/g' /etc/apache2/sites-enabled/000-default.conf

# Копіюємо файли проєкту
COPY . /var/www/html/

# Дозволяємо .htaccess
RUN a2enmod rewrite

# Відкриваємо правильний порт для Koyeb (8080)
EXPOSE 8080

# Запускаємо Apache
CMD ["apache2-foreground"]
