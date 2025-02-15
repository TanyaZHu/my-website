<?php
include(__DIR__ . '/../config/database.php');

header("Content-Type: application/json");

// Читаємо вхідні дані
$inputData = file_get_contents("php://input");
$data = json_decode($inputData, true);

// Логування отриманих даних (тільки для тестування)
file_put_contents(__DIR__ . "/debug.log", date("Y-m-d H:i:s") . " - Received Data: " . print_r($data, true) . "\n", FILE_APPEND);

if (!$data) {
    die(json_encode(["success" => false, "message" => "⚠️ No data received!", "debug" => $inputData]));
}

// Отримуємо дані
$name = htmlspecialchars(strip_tags(trim($data["name"] ?? "")));
$email = filter_var(trim($data["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$password = $data["password"] ?? "";

if (!$name || !$email || !$password) {
    die(json_encode(["success" => false, "message" => "⚠️ All fields are required"]));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die(json_encode(["success" => false, "message" => "⚠️ Invalid email format"]));
}

if (strlen($password) < 6) {
    die(json_encode(["success" => false, "message" => "⚠️ Password must be at least 6 characters"]));
}

try {
    // Перевіряємо, чи email вже використовується
    $stmt = $pdo->prepare("SELECT id FROM Users WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        die(json_encode(["success" => false, "message" => "⚠️ Email already in use"]));
    }

    // Хешуємо пароль
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Додаємо користувача
    $stmt = $pdo->prepare("INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, 'user')");
    $stmt->execute([$name, $email, $hashed_password]);

    echo json_encode(["success" => true, "message" => "✅ Registration successful"]);
} catch (PDOException $e) {
    die(json_encode(["success" => false, "message" => "❌ Database error: " . $e->getMessage()]));
}
?>
