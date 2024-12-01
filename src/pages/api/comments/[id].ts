import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ error: "Nicht authentifiziert" });
  }

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Ungültige ID" });
  }

  if (req.method === "PUT") {
    const { content, positionX, positionY } = req.body;
    try {
      const comment = await prisma.comment.update({
        where: { id },
        data: { content, positionX, positionY },
        include: {
          user: true,
          replies: {
            include: { user: true },
          },
        },
      });
      return res.status(200).json(comment);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Kommentars:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.comment.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      console.error("Fehler beim Löschen des Kommentars:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  } else if (
    req.method === "PATCH" &&
    req.url?.endsWith("/toggle-completion")
  ) {
    try {
      const comment = await prisma.comment.findUnique({ where: { id } });
      if (!comment) {
        return res.status(404).json({ error: "Kommentar nicht gefunden" });
      }
      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { isCompleted: !comment.isCompleted },
        include: {
          user: true,
          replies: {
            include: { user: true },
          },
        },
      });
      return res.status(200).json(updatedComment);
    } catch (error) {
      console.error("Fehler beim Ändern des Erledigtstatus:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  }

  return res.status(405).json({ error: "Methode nicht erlaubt" });
}
