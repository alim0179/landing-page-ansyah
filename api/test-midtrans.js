// /api/create-transaction.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const serverKey = process.env.MIDTRANS_SERVER_KEY;
      const auth = Buffer.from(serverKey + ":").toString("base64");

      const body = {
        payment_type: "bank_transfer", // Bisa diganti "gopay", "qris", dsb
        transaction_details: {
          order_id: `TEST-${Date.now()}`,
          gross_amount: 10000
        },
        bank_transfer: {
          bank: "bca"
        }
      };

      const response = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}