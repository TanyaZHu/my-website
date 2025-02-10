# Використовуємо офіційний образ PHP 8.1 з Apache
FROM php:8.1-apache

# Встановлюємо необхідні PHP-розширення
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Встановлюємо mod_rewrite для Apache
RUN a2enmod rewrite

# Налаштовуємо права доступу
RUN chown -R www-data:www-data /var/www/html

# Копіюємо всі файли в серверну папку
COPY . /var/www/html/

# Відкриваємо порт 80 для Apache
EXPOSE 80

# Запускаємо сервер Apache
CMD ["apache2-foreground"]
