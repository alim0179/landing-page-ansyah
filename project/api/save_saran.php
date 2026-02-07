<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || empty(trim($input['pesan'] ?? ''))) {
  echo json_encode(['status' => 'error']);
  exit;
}

$pesan   = htmlspecialchars(trim($input['pesan']));
$halaman = htmlspecialchars($input['halaman'] ?? '-');
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$waktu   = date('Y-m-d H:i:s');

$file = __DIR__ . '/saran.json';

if (!file_exists($file)) {
  file_put_contents($file, json_encode([]));
}

$data = json_decode(file_get_contents($file), true);
if (!is_array($data)) $data = [];

$data[] = [
  'id'      => time(),
  'pesan'   => $pesan,
  'halaman' => $halaman,
  'ip'      => $ip,
  'waktu'   => $waktu
];

file_put_contents(
  $file,
  json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
  LOCK_EX
);

echo json_encode(['status' => 'ok']);
