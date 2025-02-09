# Вибираємо офіційний образ PHP з Apache
FROM php:8.1-apache

# Встановлюємо MySQL, PHP-розширення та інші пакети
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Копіюємо всі файли у папку сервера
COPY . /var/www/html/

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо сервер Apache
CMD ["apache2-foreground"]
