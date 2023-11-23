import { useState } from "react";
import { DatePicker } from "../ui-compound/DatePicker";
import { Button } from "../ui/button";

const BookingForm = ({
  bookingId,
  data,
}: {
  bookingId: string;
  data: { bookingDate: Date; checkOutDate: Date };
}) => {
  const [bookingCheckInDate, setBookingCheckInDate] = useState<Date>(
    data.bookingDate
  );
  const [bookingCheckOutDate, setBookingCheckOutDate] = useState<Date>(
    data.checkOutDate
  );
  return (
    <div>
      <h1>Booking Form</h1>
      <div className="flex flex-row items-center w-full ">
        <div className="flex w-1/2 justify-center">
          <DatePicker
            onDateChange={(value: Date) => {
              setBookingCheckInDate((prev) => value);
            }}
          />
        </div>
        <div className="flex w-1/2 justify-center">
          <DatePicker
            onDateChange={(value: Date) => {
              setBookingCheckOutDate(value);
            }}
          />
        </div>
      </div>
      <Button className="w-full shadow-lg h-[64px] font-bold text-lg">
        Update{" "}
      </Button>
    </div>
  );
};

export default BookingForm;
