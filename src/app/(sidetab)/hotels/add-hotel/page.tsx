import HotelForm from "@/components/Hotel/HotelForm";
import Link from "next/link";
import LargeLogo from "@/../public/assets/logo/logo.svg";
import Image from "next/image";

export default function AddHotelPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full w-max-xs">
      <div className="flex flex-col gap-10 pb-8 justify-center items-center">
        <Link href="/">
          <Image src={LargeLogo} alt="logo-img"></Image>
        </Link>
        <h1 className="text-md font-bold">Add hotel</h1>
      </div>
      <HotelForm name="Add" method="post"></HotelForm>
    </div>
  );
}
