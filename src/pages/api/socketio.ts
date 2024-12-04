// Path: src/pages/api/socket/socketio.ts
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponseServerIO } from "@/types/next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: "/api/socketio",
    });

    io.on("connection", (socket) => {
      console.log("Neuer Client verbunden");

      socket.on("cursor-move", (data) => {
        socket.broadcast.emit("cursor-move", data);
      });

      socket.on("new-comment", (data) => {
        io.emit("new-comment", data);
      });

      socket.on("update-comment", (data) => {
        io.emit("update-comment", data);
      });

      socket.on("delete-comment", (id) => {
        io.emit("delete-comment", id);
      });

      socket.on("toggle-completion", (data) => {
        io.emit("toggle-completion", data);
      });

      socket.on("disconnect", () => {
        console.log("Client getrennt");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
