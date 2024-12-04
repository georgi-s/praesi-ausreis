// // path: src/pages/api/comments/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API-Route aufgerufen:", req.method);
  const session = await getServerSession(req, res, authOptions);
  console.log("Session:", session);

  if (!session || !session.user || !session.user.id) {
    console.log("Nicht authentifiziert");
    return res.status(401).json({ error: "Nicht authentifiziert" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          user: true,
          replies: {
            include: { user: true },
          },
        },
      });
      console.log("Kommentare geladen:", comments);
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Fehler beim Laden der Kommentare:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  }

  if (req.method === "POST") {
    console.log("POST-Anfrage empfangen:", req.body);
    const { content, positionX, positionY, slideIndex, parentId } = req.body;
    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          positionX,
          positionY,
          slideIndex,
          userId,
          parentId,
        },
        include: {
          user: true,
          replies: {
            include: { user: true },
          },
        },
      });
      console.log("Kommentar erstellt:", comment);
      return res.status(201).json(comment);
    } catch (error) {
      console.error("Fehler beim Erstellen des Kommentars:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  }

  if (req.method === "PUT") {
    console.log("PUT-Anfrage empfangen:", req.body);
    const { id, content } = req.body;

    try {
      const comment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        console.log("Kommentar nicht gefunden");
        return res.status(404).json({ error: "Kommentar nicht gefunden" });
      }

      if (comment.userId !== userId) {
        console.log("Keine Berechtigung zum Bearbeiten dieses Kommentars");
        return res.status(403).json({ error: "Nicht berechtigt" });
      }

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { content },
        include: {
          user: true,
          replies: {
            include: { user: true },
          },
        },
      });

      console.log("Kommentar aktualisiert:", updatedComment);
      return res.status(200).json(updatedComment);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Kommentars:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  }

  if (req.method === "DELETE") {
    console.log("DELETE-Anfrage empfangen:", req.query);
    const { id } = req.query;

    try {
      const comment = await prisma.comment.findUnique({
        where: { id: id as string },
      });

      if (!comment) {
        console.log("Kommentar nicht gefunden");
        return res.status(404).json({ error: "Kommentar nicht gefunden" });
      }

      if (comment.userId !== userId) {
        console.log("Keine Berechtigung zum Löschen dieses Kommentars");
        return res.status(403).json({ error: "Nicht berechtigt" });
      }

      await prisma.comment.delete({
        where: { id: id as string },
      });

      console.log("Kommentar gelöscht:", id);
      return res
        .status(200)
        .json({ message: "Kommentar erfolgreich gelöscht" });
    } catch (error) {
      console.error("Fehler beim Löschen des Kommentars:", error);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
  }

  return res.status(405).json({ error: "Methode nicht erlaubt" });
}
