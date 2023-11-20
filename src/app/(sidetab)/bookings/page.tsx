"use client";
import BookingCard from "@/components/Booking/BookingCard";
import { useEffect, useState } from "react";
import getBookings from "@/lib/applibs/getBookings";
import { useSession } from "next-auth/react";

export default function BookingPage() {
  const [bookingResponse, setBookingResponse] = useState(null);
  const { data: session } = useSession();

  const convertToFulldate = (date: string) => {
    // Create a Date object from the string
    const dateObject = new Date(date);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    // Format the date using toLocaleDateString
    const formattedDate = dateObject.toLocaleDateString("en-GB", options);

    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await getBookings(session?.user.token);
      setBookingResponse(bookings);
    };
    fetchData();
  }, []);

  if (!bookingResponse) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="w-max-xs flex flex-col gap-3 mb-10">
        <h1 className="text-lg font-bold">My Booking</h1>
        {bookingResponse.data.map((bookingItem: any) => (
          <BookingCard
            hotelName={bookingItem.hotel.name}
            checkInDate={convertToFulldate(bookingItem.bookingDate)}
            checkOutDate={convertToFulldate(bookingItem.checkoutDate)}
            address={bookingItem.hotel.address}
          />
        ))}
      </div>
    );
  }
}
