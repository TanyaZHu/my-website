# Використовуємо PHP 8.1 з Apache
FROM php:8.1-apache

# Встановлюємо необхідні розширення PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql

# Виправляємо проблему з Apache "Could not reliably determine the server's FQDN"
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Налаштовуємо Apache для правильної обробки PHP-файлів
RUN echo "DirectoryIndex index.php index.html" >> /etc/apache2/apache2.conf

# Копіюємо файли проєкту в контейнер
COPY . /var/www/html/

# Відкриваємо стандартний порт Render (10000)
EXPOSE 10000

# Запускаємо Apache
CMD ["apache2-foreground"]
