export default async function deleteBooking(id: string, token: any) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/bookings/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Cannot delete hotel");
  }
  return await response.json();
}
