import HotelCard from "@/components/HotelCard/HotelCard";
import searchIcon from "./../../../../public/assets/logo/searchIcon.svg";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Hotel() {
  const mockHotelData = [
    {
      name: "S31 Sukhumvit Bangkok",
      price: 1500,
      location: "Bangkok, Wattana",
    },
    {
      name: "Grand Hotel",
      price: 1200,
      location: "City Center, Downtown",
    },
    {
      name: "Ocean View Resort",
      price: 1800,
      location: "Beachside, Paradise Island",
    },
    {
      name: "Mountain Retreat Lodge",
      price: 1000,
      location: "Serenity Valley",
    },
    {
      name: "Riverside Inn",
      price: 1300,
      location: "Scenic Riverfront",
    },
    {
      name: "Luxury Oasis Spa & Resort",
      price: 2500,
      location: "Desert Oasis",
    },
    {
      name: "Alpine Chalet",
      price: 1600,
      location: "Snowy Mountains",
    },
    {
      name: "Historic Manor House",
      price: 1900,
      location: "Countryside Estates",
    },
    {
      name: "Tropical Paradise Hotel",
      price: 2000,
      location: "Island Haven",
    },
    {
      name: "Urban Boutique Suites",
      price: 1400,
      location: "Metropolitan District",
    },
    // Add more hotel objects as needed
  ];

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
        <div className="w-max-xs gap-3 flex flex-wrap">
          {" "}
          {mockHotelData.map((hotel, index) => (
            <div key={index} className="md:w-[300px]  w-full">
              <HotelCard {...hotel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
