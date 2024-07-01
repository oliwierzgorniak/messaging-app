import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import apiRouter from "./routes/api";
import { PrismaClient } from "@prisma/client";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import handleMessages from "./io/handleMessages";

const app = express();
app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
const prisma = new PrismaClient();

const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  disableTouch: true,
});

// Initialize session storage.
app.use(
  session({
    name: "qid",
    store: redisStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: false,
      sameSite: "lax", // csrf
      secure: false, // cookie only works in https
    },
    saveUninitialized: false,
    secret: "bhkserbfsekbfkbej",
    resave: false,
  })
);

app.use(express.json());
app.use("/api", apiRouter);

// io
handleMessages();

server.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});

export { io, prisma };
