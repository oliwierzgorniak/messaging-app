import { SERVER_URL } from "../consts";

export default async function signup(email: string, password: string) {
  const data = { email: email, password: password };
  const res = await fetch(`${SERVER_URL}/api/login`, {
    body: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}
