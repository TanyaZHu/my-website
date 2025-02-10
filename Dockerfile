# Використовуємо офіційний образ PHP 8.1 з Apache
FROM php:8.1-apache

# Встановлюємо необхідні PHP-розширення
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Включаємо mod_rewrite для Apache
RUN a2enmod rewrite

# Копіюємо налаштування Apache
COPY config/apache.conf /etc/apache2/sites-available/000-default.conf

# Налаштовуємо права доступу
RUN chown -R www-data:www-data /var/www/html

# Копіюємо всі файли у веб-каталог
COPY . /var/www/html/

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо сервер Apache
CMD ["apache2-foreground"]
