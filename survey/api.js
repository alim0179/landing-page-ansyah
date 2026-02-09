import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body

    await kv.lpush('survey-tools', {
      tool: body.tool,
      kategori: body.kategori,
      time: Date.now()
    })

    return res.status(200).json({ success: true })
  }

  if (req.method === 'GET') {
    const data = await kv.lrange('survey-tools', 0, 100)
    return res.status(200).json(data)
  }

  res.status(405).end()
}
