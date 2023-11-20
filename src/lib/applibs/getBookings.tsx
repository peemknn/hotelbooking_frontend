export default async function getBookings(token: any) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/bookings", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return await response.json();
}
