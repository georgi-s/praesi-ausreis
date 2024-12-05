import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

let cursorPositions: any[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Nicht authentifiziert" });
  }

  if (req.method === "GET") {
    return res.status(200).json(cursorPositions);
  } else if (req.method === "POST") {
    const { x, y, userId, userName } = req.body;
    const existingIndex = cursorPositions.findIndex((c) => c.userId === userId);
    if (existingIndex !== -1) {
      cursorPositions[existingIndex] = { x, y, userId, userName };
    } else {
      cursorPositions.push({ x, y, userId, userName });
    }
    return res.status(200).json({ message: "Cursor position updated" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
