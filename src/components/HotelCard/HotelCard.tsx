import Image from "next/image";

const HotelCard = () => {
  return (
    <div className="bg-white shadow-lg flex flex-col gap-2 p-3 rounded-xl">
      <Image
        src={"/images/hotels/bangkok_s31_sukhumvit.jpeg"}
        alt="hotel"
        width={0}
        height={0}
        sizes="100vw"
        className="w-[290px] h-[180px] rounded-lg"
      />
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-inder text-lg"> S31 Sukhumvit Bangkok </h1>
          <h2> ⭐️⭐️⭐️⭐️⭐️ </h2>
        </div>
        <div className="flex flex-col items-end bg-slate-100 p-1 rounded-xl">
          <p className="text-lg font-bold"> 1,500 ฿ </p>
          <p className="text-xs"> per night </p>
        </div>
      </div>
      <p className="text-xs"> 📍 Bangkok, Watthana </p>
    </div>
  );
};

export default HotelCard;
