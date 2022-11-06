import getDb from '../../db/adapter';

export default async function handler (req, res) {
  try {
    const db = await getDb();
    const id = req.query.id;
    const newSpaces = db.data.spaces.map(s => {
      if (s.id == id) {
        return {
          ...s,
          available: JSON.parse(req.query.available)
        };
      }
      return s;
    });
    db.data = { spaces: newSpaces };
    db.write();
    if (res.socket?.server?.io) {
      res.socket.server.io.emit('refresh');
    }
    res.json('success');
  } catch (e) {
    res.json('error');
  }
}