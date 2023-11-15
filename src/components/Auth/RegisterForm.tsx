"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import LargeLogo from "@/../public/assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function RegisterForm() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <div className="flex flex-col gap-10 pb-8 justify-center items-center">
        <Link href="/">
          <Image src={LargeLogo} alt="logo-img"></Image>
        </Link>
        <h1 className="text-md font-bold">Log in</h1>
      </div>
      <div className="pb-4 flex w-full flex-col items-center ">
        <div className="form-control w-full max-w-xs">
          <Label className="text-sm" htmlFor="email">
            Email
          </Label>
          <Input
            className="w-full rounded-md max-w-xs"
            type="email"
            placeholder="ex. john.smith@email.com"
          />
        </div>
      </div>
      <div className="pb-4 flex w-full flex-col items-center ">
        <div className="form-control w-full max-w-xs">
          <Label className="text-sm" htmlFor="password">
            Password
          </Label>
          <Input
            className="w-full rounded-md  text-sm"
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </div>
      <Button variant="default" size="sm">
        Login
      </Button>
    </div>
  );
}
