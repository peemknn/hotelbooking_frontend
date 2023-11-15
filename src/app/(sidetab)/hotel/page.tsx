import HotelCard from "@/components/HotelCard/HotelCard";
import searchIcon from "./../../../../public/assets/logo/searchIcon.svg";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Hotel() {
  return (
    <div className="font-inter">
      <form>
        <div className="w-full h-[40px] flex items-center  border border-[#E4E4E7] rounded-[8px] overflow-hidden mb-8">
          <Image
            src={searchIcon}
            alt="search-icon"
            className=" w-6 h-6 ml-1.5"
          />
          <input
            className="w-full bg-white focus:outline-none text-xs pl-2.5 py-2"
            placeholder="Search Hotels..."
          />
        </div>
      </form>
      <div>
        <h1 className="font-bold mb-3">All Hotels</h1>
        <div className="w-max-xs">
          {" "}
          <HotelCard />
        </div>
      </div>
    </div>
  );
}
