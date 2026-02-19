import fs from "fs";
import path from "path";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).send("Webhook aktif");
  }

  try {
    const data = req.body;

    const filePath = path.join("/tmp", "midtrans_log.txt");

    const logData =
      "===== NOTIFICATION =====\n" +
      new Date().toISOString() + "\n" +
      JSON.stringify(data, null, 2) +
      "\n\n";

    fs.appendFileSync(filePath, logData);

    return res.status(200).json({
      message: "Saved to txt",
      saved_to: "/tmp/midtrans_log.txt"
    });

  } catch (error) {
    return res.status(500).json({ error: "Failed" });
  }
}
