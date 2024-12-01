// // path: src/pages/api/comments/index.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("API-Route aufgerufen:", req.method);
//   const session = await getServerSession(req, res, authOptions);
//   console.log("Session:", session);

//   if (!session || !session.user || !session.user.id) {
//     console.log("Nicht authentifiziert");
//     return res.status(401).json({ error: "Nicht authentifiziert" });
//   }

//   if (req.method === "GET") {
//     const comments = await prisma.comment.findMany({
//       include: { user: true },
//     });
//     console.log("Kommentare geladen:", comments);
//     return res.status(200).json(comments);
//   } else if (req.method === "POST") {
//     console.log("POST-Anfrage empfangen:", req.body);
//     const { content, positionX, positionY, slideIndex } = req.body;
//     try {
//       const comment = await prisma.comment.create({
//         data: {
//           content,
//           positionX,
//           positionY,
//           slideIndex,
//           userId: session.user.id,
//         },
//         include: { user: true },
//       });
//       console.log("Kommentar erstellt:", comment);
//       return res.status(201).json(comment);
//     } catch (error) {
//       console.error("Fehler beim Erstellen des Kommentars:", error);
//       return res.status(500).json({ error: "Interner Serverfehler" });
//     }
//   } else if (req.method === "PUT") {
//     console.log("PUT-Anfrage empfangen:", req.body);
//     const { id, content } = req.body;
//     try {
//       const comment = await prisma.comment.update({
//         where: { id },
//         data: { content },
//         include: { user: true },
//       });
//       console.log("Kommentar aktualisiert:", comment);
//       return res.status(200).json(comment);
//     } catch (error) {
//       console.error("Fehler beim Aktualisieren des Kommentars:", error);
//       return res.status(500).json({ error: "Interner Serverfehler" });
//     }
//   } else if (req.method === "DELETE") {
//     console.log("DELETE-Anfrage empfangen:", req.query);
//     const { id } = req.query;
//     if (typeof id !== "string") {
//       return res.status(400).json({ error: "Ungültige ID" });
//     }
//     try {
//       await prisma.comment.delete({
//         where: { id },
//       });
//       console.log("Kommentar gelöscht:", id);
//       return res.status(204).end();
//     } catch (error) {
//       console.error("Fehler beim Löschen des Kommentars:", error);
//       return res.status(500).json({ error: "Interner Serverfehler" });
//     }
//   }

//   return res.status(405).json({ error: "Methode nicht erlaubt" });
// }
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

  if (req.method === "GET") {
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
  } else if (req.method === "POST") {
    console.log("POST-Anfrage empfangen:", req.body);
    const { content, positionX, positionY, slideIndex, parentId } = req.body;
    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          positionX,
          positionY,
          slideIndex,
          userId: session.user.id,
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

  return res.status(405).json({ error: "Methode nicht erlaubt" });
}
