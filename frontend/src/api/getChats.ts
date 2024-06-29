import { SERVER_URL } from "../consts";

export default async function getChats() {
  const res = await fetch(`${SERVER_URL}/api/chats`, {
    credentials: "include",
  });
  const chats = await res.json();
  return chats;
}
