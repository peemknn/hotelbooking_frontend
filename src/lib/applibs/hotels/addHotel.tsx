export default async function addHotel(data: any, token: any) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/hotels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  if (!res.ok) {
    throw new Error("Failed to add hotel");
  }
  return res.json();
}
