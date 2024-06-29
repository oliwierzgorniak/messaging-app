import { SERVER_URL } from "../consts";

// userId - id of the user from the other side
export default async function getMessages(userId: number) {
  const res = await fetch(`${SERVER_URL}/api/messages?userId=${userId}`, {
    credentials: "include",
  });
  const messages = await res.json();

  return messages;
}
