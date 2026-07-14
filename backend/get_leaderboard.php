<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Tambahan proteksi preflight request dari lintas domain browser (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "config.php";

$sql = "SELECT nickname, score FROM leaderboard ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$leaderboard = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Memastikan tipe data skor dikembalikan sebagai angka murni (integer) ke React
        $row['score'] = (int)$row['score'];
        $leaderboard[] = $row;
    }
}

echo json_encode($leaderboard);
$conn->close();
?>