// /api/create-transaction.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const auth = Buffer.from(serverKey + ":").toString("base64");

    // Ambil tipe pembayaran dari frontend (default bank_transfer)
    const { payment_type } = req.body || { payment_type: "bank_transfer" };

    // Transaksi dummy
    const body = {
      payment_type,
      transaction_details: {
        order_id: `TEST-${Date.now()}`,
        gross_amount: 10000
      }
    };

    // Jika bank transfer, tambahkan bank BCA
    if (payment_type === "bank_transfer") {
      body.bank_transfer = { bank: "bca" };
    }

    // Kirim ke Midtrans Sandbox
    const response = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Return ke frontend
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}