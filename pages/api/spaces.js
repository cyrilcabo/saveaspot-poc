// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getDb from '../../db/adapter';


export default async function handler(req, res) {
  const db = await getDb();
  res.status(200).json(db?.data?.spaces || [])
}
