import getDb from "../../db/adapter";

export default async function handler (req, res) {
  try {
    if (req.method !== 'POST' && req.headers['content-type'] !== 'application/json')
      throw new Error('Invalid request!');
    const db = await getDb();
    const newEntry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    db.data.spaces.push({
      id: Math.floor(Math.random()*100000),
      location: newEntry,
      available: false,
    });
    db.write();
    if (res.socket?.server?.io) {
      res.socket.server.io.emit('refresh');
    }
    res.json('success');
  } catch {
    res.json('error');
  }
}
