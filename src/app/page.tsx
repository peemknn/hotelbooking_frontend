"use client";
import HotelCard from "@/components/HotelCard/HotelCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/hotels");
  });
}
