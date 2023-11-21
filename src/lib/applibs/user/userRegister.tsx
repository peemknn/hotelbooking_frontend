export default async function userRegister(data: any) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (!res.ok) {
    throw new Error("Failed to register");
  }
  return res.json();
}
