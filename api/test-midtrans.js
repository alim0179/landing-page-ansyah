// /api/test-midtrans.js
export default async function handler(req, res) {
  try {
    const serverKey = "Mid-server-sp_FjPTUjMFEzIVhxqS5E5w8"; // ganti Server Key Sandbox
    const auth = Buffer.from(serverKey + ":").toString("base64");

    const body = {
      payment_type: "bank_transfer",
      transaction_details: {
        order_id: "TEST-1234",
        gross_amount: 10000
      },
      bank_transfer: {
        bank: "bca"
      }
    };

    // fetch global tersedia di Vercel Edge Runtime
    const response = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // balas JSON ke browser
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}