import HotelForm from "@/components/Hotel/HotelForm";

export default function AddHotelPage() {
  return (
    <div className="items-center flex">
      <HotelForm name="Add" method="post"></HotelForm>
    </div>
  );
}
