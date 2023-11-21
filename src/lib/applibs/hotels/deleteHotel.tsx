export default async function deleteHotel(id: string, token: any) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Cannot delete hotel");
  }
  return await response.json();
}
