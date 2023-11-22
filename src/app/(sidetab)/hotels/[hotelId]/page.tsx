"use client";
import { DatePicker } from "@/components/ui-compound/DatePicker";
import { Button } from "@/components/ui/button";
import useHttp from "@/hooks/useHttp";
import Image from "next/image";
import { useEffect, useState } from "react";
import createBooking from "@/lib/applibs/bookings/createBooking";
import { useSession } from "next-auth/react";
import getUserProfile from "@/lib/applibs/user/getUserProfile";
import deleteHotel from "@/lib/applibs/hotels/deleteHotel";
import { useRouter } from "next/navigation";
import updateHotel from "@/lib/applibs/hotels/updateHotel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HotelForm from "@/components/Hotel/HotelForm";
import { DialogClose } from "@radix-ui/react-dialog";

const HotelPageById = ({ params }: { params: { hotelId: string } }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [bookingCheckInDate, setBookingCheckInDate] = useState<Date>();
  const [bookingCheckOutDate, setBookingCheckOutDate] = useState<Date>();
  const [isValid, setIsvalid] = useState<boolean>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, request, data, error] = useHttp();
  const [profileData, setProfileData] = useState(null);
  const { data: session } = useSession();

  // Data from APi

  const getHotelById = async () => {
    await request("get", `/hotels/${params.hotelId}`);
  };

  useEffect(() => {
    getHotelById();
    getProfile();
  }, []);

  const hotelPrice = 2588;

  const closeDialog = () => {
    setOpen(false);
  };

  const getProfile = async () => {
    if (session && session.user.token) {
      try {
        const res = await getUserProfile(session.user.token);
        setProfileData(res.data);
      } catch (error) {
        console.error(error);
        setProfileData(null);
      }
    } else {
      return;
    }
  };

  const handleBookingDate = async () => {
    if (bookingCheckInDate && bookingCheckOutDate) {
      const formattedCheckInDate = new Date(bookingCheckInDate);
      const formattedCheckOutDate = new Date(bookingCheckOutDate);

      // Add one day to both check-in and check-out dates
      formattedCheckInDate.setDate(formattedCheckInDate.getDate() + 1);
      formattedCheckOutDate.setDate(formattedCheckOutDate.getDate() + 1);

      const formattedCheckInDateString = formattedCheckInDate
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDateString = formattedCheckOutDate
        .toISOString()
        .split("T")[0];

      // Now you have the formatted dates in "YYYY-MM-DD" format
      console.log("Formatted Check-In Date:", formattedCheckInDateString);
      console.log("Formatted Check-Out Date:", formattedCheckOutDateString);

      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const gapInDays = Math.round(
        (formattedCheckOutDate.getTime() - formattedCheckInDate.getTime()) /
          millisecondsInDay
      );
      console.log(gapInDays);

      if (gapInDays > 3 || gapInDays <= 0) {
        setIsvalid(false);
        setIsSubmitted(true);
        return;
      } else {
        setIsvalid(true);
        setIsSubmitted(true);
        if (session) {
          const response = await createBooking(
            params.hotelId,
            session?.user.token,
            formattedCheckInDateString,
            formattedCheckOutDateString
          );
          console.log(response);
        }
      }
    }
  };

  const handleDeleteHotel = async () => {
    try {
      const response = await deleteHotel(params.hotelId, session?.user.token);
      console.log(response);
      router.back();
    } catch (error) {
      console.log(error);
    }
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
            src={data.data.picture}
            alt="hotelbyid"
            width={0}
            height={0}
            sizes={"120vw"}
            className="rounded-xl w-full min-w-[300px] h-full max-h-[250px] object-cover shadow-lg"
          />
        </div>

        {/* Check-in , Check-out Dates */}
        <div className="flex flex-row justify-between w-full items-center">
          <div>
            <DatePicker
              onDateChange={(value: Date) => {
                setBookingCheckInDate((prev) => value);
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
        <div className="space-y-2">
          <Button
            className="w-full shadow-lg h-[64px] font-bold text-lg"
            onClick={handleBookingDate}
          >
            Book Now
          </Button>
          {profileData && profileData.role === "admin" && (
            <div className="space-y-2">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full shadow-lg h-[64px] font-bold text-lg ">
                    Update hotel information
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full w-max-xs h-[760px]">
                  <div className="flex flex-col items-center">
                    <h1 className="text-md font-bold">Update hotel</h1>
                    <HotelForm
                      hotelId={params.hotelId}
                      initialData={data.data}
                      method="put"
                      name="Update"
                      submitHandler={closeDialog}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                className="w-full shadow-lg h-[64px] font-bold text-lg bg-black  hover:bg-red-500"
                onClick={handleDeleteHotel}
              >
                Delete this hotel
              </Button>
            </div>
          )}
          {!isValid && isSubmitted && (
            <p className="text-red-500 mt-2">Cannot booking more than 3 days</p>
          )}
        </div>
      </div>
    );
};

export default HotelPageById;
