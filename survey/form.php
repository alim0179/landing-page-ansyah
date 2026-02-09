<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Survei Tools Online</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">

  <form id="form" class="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
    <h1 class="text-xl font-semibold text-gray-800">
      Tools online apa yang sering kamu pakai?
    </h1>
    <p class="text-sm text-gray-500">
      Jawaban anonim • 10 detik saja
    </p>

    <input
      type="text"
      name="tool"
      required
      placeholder="Contoh: Canva, ChatGPT, Google Docs"
      class="w-full border rounded-lg px-4 py-2 focus:ring focus:outline-none"
    />

    <select name="kategori" class="w-full border rounded-lg px-4 py-2">
      <option value="">Kategori (opsional)</option>
      <option>AI</option>
      <option>Desain</option>
      <option>Produktivitas</option>
      <option>Utility / Converter</option>
    </select>

    <button class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
      Kirim
    </button>

    <p id="status" class="text-center text-sm"></p>
  </form>

<script>
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault()

  const data = {
    tool: e.target.tool.value,
    kategori: e.target.kategori.value
  }

  const res = await fetch("./api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  document.getElementById("status").innerText =
    res.ok ? "Terima kasih 🙌" : "Gagal mengirim"

  e.target.reset()
})
</script>

</body>
</html>
