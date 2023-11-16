"use client";
import HotelCard from "@/components/HotelCard/HotelCard";
import searchIcon from "./../../../../public/assets/logo/searchIcon.svg";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import useHttp from "@/hooks/useHttp";
import { Button } from "@/components/ui/button";

export default function Hotel() {
  const [isLoading, request, data, error] = useHttp();
  const [page, goNextPage, goPrevPage, setPage] = usePagination();

  const getAllHotels = async (pageParam?: number) => {
    await request("get", "/hotels", {
      limit: 6,
      page: pageParam ? pageParam : page,
    });
  };

  useEffect(() => {
    getAllHotels();
  }, [page]);

  if (!data) return <h1>Loading...</h1>;
  return (
    <div className="font-inder mb-10">
      <form>
        <div className="w-full h-[50px] flex items-center  border border-[#E4E4E7] rounded-[8px] overflow-hidden mb-8">
          <Image
            src={searchIcon}
            alt="search-icon"
            className=" w-6 h-6 ml-1.5"
          />
          <input
            className="w-full bg-white focus:outline-none text-md pl-2.5 py-2"
            placeholder="Search Hotels..."
          />
        </div>
      </form>
      <div>
        <h1 className="font-bold mb-3">All Hotels</h1>
        <div className="flex flex-col justify-center">
          <div className="w-max-xs flex flex-wrap gap-3 mb-10">
            {!isLoading &&
              data &&
              data.data.map((hotel: any, index: number) => {
                return (
                  <div key={index} className="md:w-[300px]  w-full">
                    <HotelCard
                      id={hotel.id}
                      name={hotel.name}
                      address={hotel.address}
                    />
                  </div>
                );
              })}

            {/*  {hotelResponse.data.map((hotelItem, index) => (
            <div key={index} className="md:w-[300px]  w-full">
              <HotelCard {...hotel} />
            </div>
          ))} */}
          </div>
          {page > 0 && data && (
            <div className="join mx-auto">
              <Button
                onClick={goPrevPage}
                className={`join-item btn rounded-r-none  ${
                  page === 1 ? "btn-disabled" : ""
                }`}
              >
                «
              </Button>
              <Button className="join-item btn rounded-none bg-slate-200 text-black">
                Page {page}
              </Button>
              <Button
                onClick={goNextPage}
                className={`join-item rounded-l-none btn ${
                  data.pagination.page <= page ? "btn-disabled" : ""
                }`}
              >
                »
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
