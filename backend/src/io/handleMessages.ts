import { io, prisma, redisClient } from "../index";

export default function handleMessages() {
  io.on("connection", async (socket) => {
    // @ts-ignore
    const senderId = socket.request.session.userId as number | undefined;
    if (senderId) {
      await redisClient.hSet("socket-ids", senderId, socket.id);
    }

    // recipient - user id of the user
    socket.on(
      "message",
      async (message: { content: string; recipient: number }) => {
        // passing a message
        const recipientSocketId = await redisClient.hGet(
          "socket-ids",
          String(message.recipient)
        );

        if (recipientSocketId) {
          socket
            .to(recipientSocketId)
            .emit("message", { sender: senderId, content: message.content });
        } else {
          console.error("no recipientSocketId");
        }

        // saving a message to db
        if (senderId) {
          await prisma.message.create({
            data: {
              sender: senderId,
              recipient: message.recipient,
              content: message.content,
            },
          });
        } else {
          console.error("no senderId");
        }
      }
    );
  });
}
