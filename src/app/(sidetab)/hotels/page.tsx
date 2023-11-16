"use client";
import HotelCard from "@/components/HotelCard/HotelCard";
import searchIcon from "./../../../../public/assets/logo/searchIcon.svg";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import useHttp from "@/hooks/useHttp";

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
    <div className="font-inder">
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
              <button
                onClick={goPrevPage}
                className={`join-item btn  ${page === 1 ? "btn-disabled" : ""}`}
              >
                «
              </button>
              <button className="join-item btn bg-white">Page {page}</button>
              <button
                onClick={goNextPage}
                className={`join-item bck btn ${
                  data.pagination.page <= page ? "btn-disabled" : ""
                }`}
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
