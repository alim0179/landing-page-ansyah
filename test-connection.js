import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = "DEV-SGu7so8vSNfqRH1vZSLYfNqT0HKvWM5xq92S88Ol"; // test dulu

    const response = await axios.get(
      "https://tripay.co.id/api-sandbox/merchant/payment-channel",
      {
        headers: {
          Authorization: "Bearer " + apiKey,
        },
        validateStatus: function (status) {
          return status < 999; // biar tidak error walau gagal
        },
      }
    );

    return res.status(200).json(response.data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}