import { SERVER_URL } from "../consts";

export default async function signup(email: string, password: string) {
  const data = { email: email, password: password };
  const res = await fetch(`${SERVER_URL}/api/signup`, {
    body: JSON.stringify(data),
    method: "post",
  });

  return await res.json();
}
