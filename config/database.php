<?php
$dsn = "pgsql:host=monorail.proxy.rlwy.net;port=53676;dbname=railway";
$user = "postgres";
$password = "yBvUgaqtraIRooWftLCLkGtjCFzYuonj";

try {
    $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "✅ Підключення успішне!";
} catch (PDOException $e) {
    die("❌ Помилка підключення: " . $e->getMessage());
}
?>
