include(__DIR__ . '/../config/database.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"] ?? null;
    $email = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;

    if (!$name || !$email || !$password) {
        die(json_encode(["success" => false, "message" => "All fields are required"]));
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die(json_encode(["success" => false, "message" => "Invalid email format"]));
    }

    if (strlen($password) < 6) {
        die(json_encode(["success" => false, "message" => "Password must be at least 6 characters"]));
    }

    // Перевіряємо, чи email вже існує
    $stmt = $pdo->prepare("SELECT id FROM Users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        die(json_encode(["success" => false, "message" => "Email already in use"]));
    }

    // Хешуємо пароль
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Додаємо користувача
    $stmt = $pdo->prepare("INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, 'user')");
    $stmt->execute([$name, $email, $hashed_password]);

    echo json_encode(["success" => true]);
}
