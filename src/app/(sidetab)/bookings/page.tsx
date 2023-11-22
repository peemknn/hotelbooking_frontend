"use client";
import BookingCard from "@/components/Booking/BookingCard";
import { useEffect, useState } from "react";
import getBookings from "@/lib/applibs/bookings/getBookings";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { convertToFulldate } from "@/utils/date";

export default function BookingPage() {
  const [bookingResponse, setBookingResponse] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await getBookings(session?.user.token);
      setBookingResponse(bookings);
    };
    fetchData();
  }, []);
  console.log(bookingResponse);

  if (!bookingResponse) {
    return <h1>Loading...</h1>;
  } else if (bookingResponse.data.length == 0) {
    return <h1 className="text-center mt-5">No Booking Yet.</h1>;
  } else {
    return (
      <div className="w-max-xs flex flex-col gap-3 mb-10">
        <h1 className="text-lg font-bold">My Booking</h1>
        {bookingResponse.data.map((bookingItem: any) => (
          <Link href={`bookings/${bookingItem._id}`}>
            <BookingCard
              hotelName={bookingItem.hotel.name}
              checkInDate={convertToFulldate(bookingItem.bookingDate)}
              checkOutDate={convertToFulldate(bookingItem.checkoutDate)}
              address={bookingItem.hotel.address}
            />
          </Link>
        ))}
      </div>
    );
  }
}
