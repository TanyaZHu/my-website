<?php
$host = getenv('MYSQL_HOST') ?: 'mysql_db';
$dbname = getenv('MYSQL_DATABASE') ?: 'mydatabase';
$user = getenv('MYSQL_USER') ?: 'user';
$pass = getenv('MYSQL_PASSWORD') ?: 'password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Підключення до бази даних успішне!";
} catch (PDOException $e) {
    die("Помилка підключення: " . $e->getMessage());
}
?>
