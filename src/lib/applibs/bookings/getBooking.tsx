export default async function getBooking(id: string, token: any) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/bookings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch booking info");
  }
  return await response.json();
}
