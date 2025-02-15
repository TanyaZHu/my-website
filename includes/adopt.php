<?php
include '../config/database.php';

header("Content-Type: application/json");
$inputData = json_decode(file_get_contents("php://input"), true);

if (!isset($inputData["user_id"]) || !isset($inputData["animal_id"])) {
    echo json_encode(["success" => false, "message" => "Некоректні дані"]);
    exit();
}

$user_id = intval($inputData["user_id"]);
$animal_id = intval($inputData["animal_id"]);

try {
    // Перевіряємо, чи тварина вже в процесі всиновлення
    $stmt = $pdo->prepare("SELECT id FROM AdoptionRequests WHERE user_id = ? AND animal_id = ?");
    $stmt->execute([$user_id, $animal_id]);

    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "Ви вже подали заявку на цю тварину"]);
        exit();
    }

    // Додаємо заявку в базу
    $stmt = $pdo->prepare("INSERT INTO AdoptionRequests (user_id, animal_id, status) VALUES (?, ?, 'pending')");
    if ($stmt->execute([$user_id, $animal_id])) {
        echo json_encode(["success" => true, "message" => "Заявку подано успішно!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Помилка при подачі заявки"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Помилка сервера: " . $e->getMessage()]);
}
?>
