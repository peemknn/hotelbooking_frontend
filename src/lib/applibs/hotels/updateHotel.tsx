export default async function updateHotel(id: any, data: any, token: any) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/hotels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data,
  });
  if (!res.ok) {
    throw new Error("Failed to update hotel");
  }
  return res.json();
}
