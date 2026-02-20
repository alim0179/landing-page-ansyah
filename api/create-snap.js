// /api/create-snap.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const auth = Buffer.from(serverKey + ":").toString("base64");

    const { payment_type } = req.body || { payment_type: "gopay" }; // default gopay

    // Body Snap transaction
    const body = {
      transaction_details: {
        order_id: `TEST-${Date.now()}`,
        gross_amount: 10000
      },
      enabled_payments: [payment_type],
      credit_card: { secure: true }
    };

    // Request Snap token
    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(200).json(data); // akan ada `token` di response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}