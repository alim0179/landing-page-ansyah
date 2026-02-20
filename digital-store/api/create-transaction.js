import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product_id } = req.body;

  const filePath = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(fs.readFileSync(filePath));
  const product = products.find(p => p.id === product_id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const auth = Buffer.from(serverKey + ":").toString("base64");

  const orderId = `ORDER-${Date.now()}`;

  const body = {
    transaction_details: {
      order_id: orderId,
      gross_amount: product.price
    },
    item_details: [
      {
        id: product.id,
        price: product.price,
        quantity: 1,
        name: product.name
      }
    ],
    credit_card: { secure: true }
  };

  const response = await fetch(
    "https://app.sandbox.midtrans.com/snap/v1/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();

  res.status(200).json({ token: data.token });
}