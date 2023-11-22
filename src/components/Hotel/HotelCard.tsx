import Image from "next/image";
import Link from "next/link";

const HotelCard = ({
  id,
  name,
  price,
  address,
  picture,
}: {
  id: string;
  name: string;
  price?: number;
  address: string;
  picture: string;
}) => {
  return (
    <Link href={`hotels/${id}`}>
      <div className="bg-white shadow-lg flex flex-col gap-2 p-3 rounded-xl w-full  font-inder overflow-hidden">
        <Image
          src={picture}
          alt="hotel"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto md:h-[180px] h-[220px] rounded-lg"
        />
        <div className="flex flex-row justify-between items-center py-1">
          <div>
            <h1 className="text-lg"> {name} </h1>
            <h2> ⭐️⭐️⭐️⭐️⭐️ </h2>
          </div>
          <div className="flex flex-col items-end bg-slate-100 p-1 rounded-xl">
            <p className="text-lg font-bold font-inter"> 1,500 ฿ </p>
            <p className="text-xs"> per night </p>
          </div>
        </div>
        <p className="text-xs py-2"> 📍 {address} </p>
      </div>
    </Link>
  );
};

export default HotelCard;
