export default async function createBooking(
  id: string,
  token: string,
  checkInDate: string,
  checkOutDate: string
) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/hotels/${id}/bookings`,
    {
      method: "POST",
      body: JSON.stringify({
        bookingDate: checkInDate,
        checkoutDate: checkOutDate,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Cannot create new booking");
  } else {
    return await response.json();
  }
}
