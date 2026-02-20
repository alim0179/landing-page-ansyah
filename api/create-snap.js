// /api/create-snap.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const auth = Buffer.from(serverKey + ":").toString("base64");

    // Snap transaction request body
    const body = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: 10000
      },
      credit_card: { secure: true } // untuk kartu kredit
      // Snap popup otomatis menampilkan semua payment methods
    };

    // Request token Snap
    const response = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    // Kirim token ke frontend
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}