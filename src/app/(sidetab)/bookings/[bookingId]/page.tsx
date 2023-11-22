"use client";
import getBooking from "@/lib/applibs/bookings/getBooking";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { convertToFulldate } from "@/utils/date";
import getUserProfile from "@/lib/applibs/user/getUserProfile";

export default function BookingPageById({
  params,
}: {
  params: { bookingId: string };
}) {
  const { data: session } = useSession();
  const [bookingDesc, setBookingDesc] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const bookingDesc = await getBooking(
        params.bookingId,
        session?.user.token
      );
      setBookingDesc(bookingDesc);
    };
    fetchData();
  }, []);

  if (!bookingDesc) return <h1>Loading...</h1>;
  return (
    <div className="w-full flex flex-col">
      <div>Checkin: {convertToFulldate(bookingDesc.data.bookingDate)}</div>
    </div>
  );
}
