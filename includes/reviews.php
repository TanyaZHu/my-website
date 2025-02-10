<?php
include '../config/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["reviewer_id"]) && isset($_POST["reviewed_id"]) && isset($_POST["rating"])) {
    $reviewer_id = intval($_POST["reviewer_id"]);
    $reviewed_id = intval($_POST["reviewed_id"]);
    $rating = intval($_POST["rating"]);
    $comment = isset($_POST["comment"]) ? htmlspecialchars(strip_tags(trim($_POST["comment"]))) : "";

    if ($rating < 1 || $rating > 5) {
        echo json_encode(["success" => false, "message" => "La calificación debe ser entre 1 y 5."]);
        exit();
    }

    // Verificar si ya se dejó una reseña
    $stmt = $conn->prepare("SELECT id FROM Reviews WHERE reviewer_id = ? AND reviewed_id = ?");
    $stmt->bind_param("ii", $reviewer_id, $reviewed_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Ya has dejado una reseña para este usuario."]);
        exit();
    }
    $stmt->close();

    // Insertar reseña
    $stmt = $conn->prepare("INSERT INTO Reviews (reviewer_id, reviewed_id, rating, comment) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $reviewer_id, $reviewed_id, $rating, $comment);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al agregar la reseña."]);
    }
    $stmt->close();
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["reviewed_id"])) {
    $reviewed_id = intval($_GET["reviewed_id"]);

    // Obtener reseñas
    $stmt = $conn->prepare("SELECT Users.name AS reviewer_name, Reviews.rating, Reviews.comment, Reviews.created_at 
                            FROM Reviews 
                            JOIN Users ON Reviews.reviewer_id = Users.id 
                            WHERE Reviews.reviewed_id = ? ORDER BY Reviews.created_at DESC");
    $stmt->bind_param("i", $reviewed_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    $totalRating = 0;
    $count = 0;
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
        $totalRating += $row["rating"];
        $count++;
    }
    $stmt->close();

    // Calcular calificación promedio
    $averageRating = $count > 0 ? round($totalRating / $count, 1) : 0;

    echo json_encode(["success" => true, "reviews" => $reviews, "average_rating" => $averageRating]);
}

$conn->close();
?>
