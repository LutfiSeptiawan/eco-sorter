<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'config.php';

// Mengambil data JSON yang dikirim oleh React fetch body
$data = json_decode(file_get_contents("php://input"), true);

$nickname = null;
if (isset($data['nickname'])) {
    $nickname = $data['nickname'];
} elseif (isset($data['name'])) {
    $nickname = $data['name'];
}

if ($nickname !== null && isset($data['score'])) {
    $name = $conn->real_escape_string(trim($nickname));
    $score = (int)$data['score'];

    // 1. Cek apakah nama ini sudah pernah ada di database
    $result = $conn->query("SELECT score FROM leaderboard WHERE nickname = '$name'");

    if ($result && $result->num_rows > 0) {
        // Nama sudah ada, ambil skor lamanya
        $row = $result->fetch_assoc();
        $oldScore = (int)$row['score'];

        // 2. Bandingkan: Jika skor baru lebih besar dari skor lama, lakukan UPDATE
        if ($score > $oldScore) {
            $updateSql = "UPDATE leaderboard SET score = $score WHERE nickname = '$name'";
            if ($conn->query($updateSql) === TRUE) {
                echo json_encode(["status" => "success", "message" => "Skor tertinggi baru diperbarui!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Gagal update skor"]);
            }
        } else {
            // Jika skor baru lebih kecil atau sama, tidak perlu diupdate
            echo json_encode(["status" => "success", "message" => "Skor lama masih lebih tinggi, data tidak diubah."]);
        }
    } else {
        // 3. Jika nama belum pernah ada, buat baris baru (INSERT)
        $insertSql = "INSERT INTO leaderboard (nickname, score) VALUES ('$name', $score)";
        if ($conn->query($insertSql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Skor baru berhasil disimpan!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Gagal menyimpan skor baru"]);
        }
    }
} else {
    echo json_encode(["status" => "failed", "message" => "Data tidak lengkap"]);
}

$conn->close();
?>