"use client";
import BookingCard from "@/components/Booking/BookingCard";
import { useEffect, useState } from "react";
import getBookings from "@/lib/applibs/bookings/getBookings";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { convertToFulldate } from "@/utils/date";
import getUserProfile from "@/lib/applibs/user/getUserProfile";

export default function BookingPage() {
  const [bookingResponse, setBookingResponse] = useState<any>(null);
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<any>(null);

  const getProfile = async () => {
    if (session && session.user.token) {
      try {
        const res = await getUserProfile(session.user.token);
        setProfileData(res.data);
        console.log("Profile Data", res.data);
      } catch (error) {
        console.error("Error setting profileData:", error);
        setProfileData(null);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getBookings(session?.user.token);
      setBookingResponse(bookings);
    };
    fetchBookings();
    getProfile();
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
          <BookingCard
            bookingId={bookingItem._id}
            hotelName={bookingItem.hotel.name}
            checkInDate={convertToFulldate(bookingItem.bookingDate)}
            checkOutDate={convertToFulldate(bookingItem.checkoutDate)}
            address={bookingItem.hotel.address}
            userId={bookingItem.user}
            isAdmin={profileData?.role === "admin"}
          />
        ))}
      </div>
    );
  }
}
