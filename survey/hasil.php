<?php
$data = json_decode(file_get_contents('data.json'), true);
$data = array_reverse($data);
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Hasil Masukan</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    body { font-family: Arial; background:#f1f3f4; padding:24px }
    .wrap { max-width:800px; margin:auto }
    .card {
      background:#fff; padding:20px; border-radius:8px;
      margin-bottom:16px; box-shadow:0 1px 3px rgba(0,0,0,.1)
    }
    .label { font-size:12px; color:#80868b }
    .value { margin-bottom:8px }
    .time { font-size:12px; color:#9ca3af; text-align:right }
  </style>
</head>
<body>

<div class="wrap">
  <h1>Hasil Masukan Tools</h1>
  <p>Data anonim dari pengunjung</p>

  <?php if (empty($data)): ?>
    <p>Belum ada masukan</p>
  <?php endif; ?>

  <?php foreach ($data as $item): ?>
    <div class="card">
      <div class="label">Tools</div>
      <div class="value"><?= htmlspecialchars($item['tools']) ?></div>

      <div class="label">Dipakai untuk</div>
      <div class="value"><?= htmlspecialchars($item['fungsi'] ?: '-') ?></div>

      <div class="label">Sulit ditemukan</div>
      <div class="value"><?= htmlspecialchars($item['butuh'] ?: '-') ?></div>

      <div class="label">Kategori</div>
      <div class="value"><?= htmlspecialchars($item['kategori'] ?: '-') ?></div>

      <div class="label">Minat</div>
      <div class="value"><?= htmlspecialchars($item['minat'] ?: '-') ?></div>

      <div class="time"><?= date('d M Y H:i', $item['time']) ?></div>
    </div>
  <?php endforeach; ?>
</div>

</body>
</html>
