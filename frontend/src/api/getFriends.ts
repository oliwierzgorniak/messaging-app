import { SERVER_URL } from "../consts";

export default async function getFriends(name: string) {
  const res = await fetch(`${SERVER_URL}/api/login?name=${name}`);
  return await res.json();
}
