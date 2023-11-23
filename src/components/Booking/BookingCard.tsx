import { useEffect, useState } from "react";
import { Button } from "../ui/button";
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
  checkInDate,
  checkOutDate,
  address,
  userId,
  isAdmin,
}: {
  bookingId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  address: string;
  userId: string;
  isAdmin: boolean;
}) {
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
  useEffect(() => {
    getBookingById();
  }, []);

  const updateBookingHandler = () => {
    // update booking
    setOpen(true);
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
          <div className="flex flex-col">
            <p className="text-xs"> User ID: {userId} </p>
            <div className="flex">
              <div className="m-2">
                <div className="w-1/2">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full shadow-lg h-[64px] font-bold text-lg ">
                        Update Booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full w-max-xs h-[760px]">
                      <div className="flex flex-col items-center">
                        <h1 className="text-md font-bold">Update Booking</h1>
                        <BookingForm
                          bookingId={bookingId}
                          initialData={dataJson?.data}
                          method="put"
                          name="Update"
                          submitHandler={() => setOpen(false)}
                        />
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
