import { io } from "../index";

export default function handleMessages() {
  io.on("connection", (socket) => {
    socket.on("message", (message) => {
      console.log(message);
    });
  });
}
