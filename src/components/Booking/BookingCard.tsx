export default function BookingCard({
  hotelName,
  checkInDate,
  checkOutDate,
  address,
}: {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  address: string;
}) {
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
    </div>
  );
}
