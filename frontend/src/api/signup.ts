import { SERVER_URL } from "../consts";

export default async function signup(name: string, password: string) {
  const data = { name: name, password: password };
  const res = await fetch(`${SERVER_URL}/api/signup`, {
    body: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
