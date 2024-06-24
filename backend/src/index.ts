import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});

export { io };
