export default async function updateBooking(
  id: string,
  token: any,
  checkInDate: any,
  checkOutDate: any
) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/bookings/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        bookingDate: checkInDate,
        checkoutDate: checkOutDate,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Cannot update booking");
  } else {
    return await response.json();
  }
}
