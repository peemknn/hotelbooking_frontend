import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DatePicker } from "../ui-compound/DatePicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import updateBooking from "@/lib/applibs/bookings/updateBooking";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import deleteBooking from "@/lib/applibs/bookings/deleteBooking";
import { useSession } from "next-auth/react";
import BookingForm from "./BookingForm";
import useHttp from "@/hooks/useHttp";
import { set } from "date-fns";
export default function BookingCard({
  bookingId,
  hotelName,
  hotelId,
  checkInDate,
  checkOutDate,
  address,
  userId,
  isAdmin,
}: {
  bookingId: string;
  hotelName: string;
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  address: string;
  userId: string;
  isAdmin: boolean;
}) {
  const [bookingCheckInDate, setBookingCheckInDate] = useState<Date>();
  const [bookingCheckOutDate, setBookingCheckOutDate] = useState<Date>();
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [isValid, setIsvalid] = useState<boolean>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataJson, setDataJson] = useState<any>({});
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  const getBookingById = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    setDataJson(await data.json().then((res) => res.data));
    console.log("getBookingById: ", dataJson?.data);
  };

  const updateBookingHandler = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await updateBooking(
        bookingId,
        session?.user.token,
        checkIn,
        checkOut
      );
      console.log(res);
      updateBookingHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookingHandler = async (e: any) => {
    // delete booking
    e.preventDefault();
    e.stopPropagation();
    console.log("delete booking");
    try {
      const response = await deleteBooking(bookingId, session?.user.token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white shadow-lg flex flex-col gap-2 p-3 rounded-xl w-full h-full  font-inder overflow-hidden">
      <div className="flex flex-row justify-between items-center py-1">
        <div>
          <h1 className="text-lg"> {hotelName} </h1>
        </div>
        <div className="flex flex-col items-end bg-slate-100 p-1 rounded-xl">
          <p className="text-sm  font-inter">
            {" "}
            {checkInDate} - {checkOutDate}
          </p>
        </div>
      </div>
      <p className="text-xs py-2"> 📍 {address} </p>
      {isAdmin && (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col w-full">
            <p className="text-xs"> Customer Name: {userId} </p>
            <div className="flex flex-row justify-between space-x-3 w-full mt-2">
              <div className="w-1/2">
                <div className="w-full">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full shadow-lg h-[48px] font-semibold font-inder ">
                        Update Booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full w-max-xs h-[350px]">
                      <div className="flex flex-col items-center">
                        <h1 className="text-md font-bold mb-10">
                          Update Booking
                        </h1>
                        <div className="flex flex-col items-center w-full ">
                          <div className="flex flex-col">
                            <Label className="text-sm" htmlFor="email">
                              Checkin Date
                            </Label>
                            <Input
                              className="w-full rounded-md max-w-xs"
                              type="text"
                              placeholder="ex. 2023-08-20"
                              onChange={(e) => setCheckIn(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col ">
                            <Label className="text-sm" htmlFor="email">
                              Checkout Date
                            </Label>
                            <Input
                              className="w-full rounded-md max-w-xs"
                              type="text"
                              placeholder="ex. 2023-08-20"
                              onChange={(e) => setCheckOut(e.target.value)}
                            />
                          </div>
                          <Button
                            className="shadow-lg h-[45px] mt-3 text-lg"
                            size="md"
                            onClick={handleUpdate}
                          >
                            Update Booking
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="w-1/2">
                <AlertDialog>
                  <AlertDialogTrigger className="w-full">
                    <Button className="w-full shadow-lg h-[48px] font-semibold font-inder  bg-black  hover:bg-red-500">
                      Delete Booking
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteBookingHandler}>
                        Delete Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
