import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import apiRouter from "./routes/api";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use("/api", apiRouter);

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});

export { io };
