<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('data.json'), true);

  $data[] = [
    'tools'    => $_POST['tools'] ?? '',
    'fungsi'   => $_POST['fungsi'] ?? '',
    'butuh'    => $_POST['butuh'] ?? '',
    'kategori' => $_POST['kategori'] ?? '',
    'minat'    => $_POST['minat'] ?? '',
    'time'     => time()
  ];

  file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));
  header('Location: hasil.php');
  exit;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Masukan Tools Online</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    body { font-family: Arial; background:#f1f3f4; padding:24px }
    .box { max-width:680px; margin:auto; background:#fff; padding:24px; border-radius:8px; border-top:8px solid #673ab7 }
    h1 { font-size:22px }
    p { color:#5f6368; font-size:14px }
    .q { margin-top:24px }
    label { font-size:15px }
    input, textarea, select {
      width:100%; padding:10px 6px; margin-top:6px;
      border:none; border-bottom:2px solid #dadce0; font-size:15px
    }
    button { margin-top:28px; background:#673ab7; color:#fff; border:none; padding:10px 28px; border-radius:4px }
    small { color:#80868b }
  </style>
</head>
<body>

<div class="box">
  <h1>Bantu Kami Nentuin Tools 🙌</h1>
  <p>Form ini anonim. Tidak menyimpan data pribadi.</p>

  <form method="post">
    <div class="q">
      <label>Biasanya kamu pakai tools online apa?</label>
      <input name="tools" required>
    </div>

    <div class="q">
      <label>Biasanya dipakai buat apa?</label>
      <textarea name="fungsi"></textarea>
    </div>

    <div class="q">
      <label>Ada tools yang susah ditemukan?</label>
      <input name="butuh">
    </div>

    <div class="q">
      <label>Lebih sering butuh tools jenis apa?</label>
      <select name="kategori">
        <option value="">— Pilih —</option>
        <option>Text / Caption</option>
        <option>Gambar / PDF</option>
        <option>QR / Utility</option>
        <option>AI sederhana</option>
      </select>
    </div>

    <div class="q">
      <label>Kalau ada tools gratis & simpel?</label>
      <select name="minat">
        <option value="">— Pilih —</option>
        <option>Sangat mungkin</option>
        <option>Mungkin</option>
        <option>Biasa saja</option>
      </select>
    </div>

    <button>Kirim Masukan</button>
    <p><small>Jangan tulis info pribadi ya 🙏</small></p>
  </form>
</div>

</body>
</html>
