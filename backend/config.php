<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DATA KONEKSI 
$host     = "roundtable.proxy.rlwy.net";
$user     = "root";
$pass     = "gCHgDeXBygVInpLgWREIbeVdZgXnFByB"; 
$db_name  = "railway"; 
$port     = 36980; 

// Menghubungkan ke database
$conn = new mysqli($host, $user, $pass, $db_name, $port);

if ($conn->connect_error) {
    header("Content-Type: application/json");
    die(json_encode(["status" => "error", "message" => "Koneksi Gagal: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");
?>