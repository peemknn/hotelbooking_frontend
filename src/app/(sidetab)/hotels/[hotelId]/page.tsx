"use client";
import { DatePicker } from "@/components/ui-compound/DatePicker";
import { Button } from "@/components/ui/button";
import useHttp from "@/hooks/useHttp";
import Image from "next/image";
import { useEffect } from "react";

const HotelPageById = ({ params }: { params: { hotelId: string } }) => {
  const [isLoading, request, data, error] = useHttp();
  // Data from APi

  const getHotelById = async () => {
    await request("get", `/hotels/${params.hotelId}`);
  };

  useEffect(() => {
    getHotelById();
  }, []);

  const hotelPrice = 2588;

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
            <DatePicker />
          </div>
          <div>
            <DatePicker />
          </div>
        </div>
        <div>
          <Button
            variant={"default"}
            className="w-full shadow-lg h-[64px] font-bold text-lg"
          >
            Book Now
          </Button>
        </div>
      </div>
    );
};

export default HotelPageById;
