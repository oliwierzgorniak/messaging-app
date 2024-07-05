import { SERVER_URL } from "../consts";

export default async function addChat(user: number) {
  const data = { userId: user };
  const res = await fetch(`${SERVER_URL}/api/add-chat`, {
    body: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
