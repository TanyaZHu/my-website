<?php
// Отримуємо DATABASE_URL із змінних середовища Render
$databaseUrl = getenv("DATABASE_URL");

if (!$databaseUrl) {
    die("❌ ERROR: DATABASE_URL не встановлено!");
}

// Розбираємо `DATABASE_URL`
$databaseParts = parse_url($databaseUrl);
$host = $databaseParts["host"];
$port = $databaseParts["port"];
$user = $databaseParts["user"];
$password = $databaseParts["pass"];
$dbname = ltrim($databaseParts["path"], '/');

// Створюємо DSN
$dsn = "pgsql:host=$host;port=$port;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("❌ Database connection failed: " . $e->getMessage());
}
?>
