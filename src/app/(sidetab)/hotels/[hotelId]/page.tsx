"use client";
import { DatePicker } from "@/components/ui-compound/DatePicker";
import { Button } from "@/components/ui/button";
import useHttp from "@/hooks/useHttp";
import Image from "next/image";
import { useEffect, useState } from "react";
import createBooking from "@/lib/applibs/createBooking";

const HotelPageById = ({ params }: { params: { hotelId: string } }) => {
  const [bookingCheckInDate, setBookingCheckInDate] = useState<Date>();
  const [bookingCheckOutDate, setBookingCheckOutDate] = useState<Date>();
  const [isValid, setIsvalid] = useState(false);
  const [isLoading, request, data, error] = useHttp();
  // Data from APi

  const getHotelById = async () => {
    await request("get", `/hotels/${params.hotelId}`);
  };

  useEffect(() => {
    getHotelById();
  }, []);

  const hotelPrice = 2588;

  const handleBookingDate = () => {
    console.log(bookingCheckInDate);

    if (bookingCheckInDate && bookingCheckOutDate) {
      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const gapInDays = Math.round(
        (bookingCheckOutDate.getTime() - bookingCheckInDate.getTime()) /
          millisecondsInDay
      );

      if (gapInDays > 3 || gapInDays <= 0) {
        setIsvalid(false);
        return;
      } else {
        setIsvalid(true);
      }
    }
  };

  const handleBooking = async () => {
    handleBookingDate();
    /* createBooking(params.hotelId, session.user.token); */
    /* TODO:Sent to API  */
  };

  // Format price with comma
  const hotelPriceWithComma = hotelPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (data && !isLoading)
    return (
      <div className="w-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          {/* Left Div */}
          <div className="flex flex-col gap">
            <h1 className="text-lg font-inder"> {data.data.name} </h1>
            <p> ⭐️⭐️⭐️⭐️⭐️</p>
          </div>
          {/* Right Div */}
          <div className="flex flex-col justify-center items-end bg-gray-100 p-1 px-2 rounded-xl ">
            <h2 className="font-sans font-bold"> {hotelPriceWithComma} ฿</h2>
            <p className="text-xs"> per night </p>
          </div>
        </div>
        {/* Address and Tel */}
        <div className="flex flex-row justify-between items-center">
          {/* Address */}
          <div className="flex gap-2 items-center">
            <p> 📍 </p>
            <p className="text-xs break-normal max-w-[200px]">
              {data.data.address}
            </p>
          </div>
          {/* Tel */}
          <div className="flex gap-2 items-center">
            <p> 📞 </p>
            <p className="text-xs"> {data.data.tel} </p>
          </div>
        </div>
        {/* Image */}
        <div>
          <Image
            src="/images/hotels/bangkok_s31_sukhumvit.jpeg"
            alt={data.picture}
            width={0}
            height={0}
            sizes={"100vw"}
            className="rounded-xl w-full min-w-[300px] h-full max-h-[250px] object-cover shadow-lg"
          />
        </div>

        {/* Check-in , Check-out Dates */}
        <div className="flex flex-row justify-between w-full items-center">
          <div>
            <DatePicker
              onDateChange={(value: Date) => {
                setBookingCheckInDate(value);
              }}
            />
          </div>
          <div>
            <DatePicker
              onDateChange={(value: Date) => {
                setBookingCheckOutDate(value);
              }}
            />
          </div>
        </div>
        <div>
          <Button
            variant={"default"}
            className="w-full shadow-lg h-[64px] font-bold text-lg"
            onClick={handleBooking}
          >
            Book Now
          </Button>
          {!isValid && (
            <p className="text-red-500 mt-2">Cannot booking more than 3 days</p>
          )}
        </div>
      </div>
    );
};

export default HotelPageById;
