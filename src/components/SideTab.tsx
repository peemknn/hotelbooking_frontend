"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HamburgerSvg } from "./SideTab/Hamburger";
import { SideTabMenus } from "./SideTab/SideTabMenus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Logo from "./SideTab/Logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";

export default function SideTab() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row">
      <div className="absolute top-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="pt-10 pl-7">
              <HamburgerSvg />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[250px] sm:w-[540px]">
            <SheetHeader className="items-center">
              <SheetTitle className="">
                <Logo />
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {SideTabMenus.map((menu) => {
                return (
                  <div className="font-inder text-center" key={menu.href}>
                    <Link key={menu.href} href={menu.href}>
                      {" "}
                      {menu.label}
                    </Link>
                  </div>
                );
              })}
              {session ? (
                <div className="space-y-4">
                  {" "}
                  <div className="font-inder text-center">
                    <Link href="/bookings">Booking</Link>
                  </div>
                  <div className="font-inder text-center">
                    <Link href="/api/auth/signout">Signout</Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="font-inder text-center">
                    <Link href="/login">Login</Link>
                  </div>
                  <div className="font-inder text-center">
                    <Link href="/register">Register</Link>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
            <SheetFooter>
              <SheetClose asChild>
                {/* <Button type="submit">Save changes</Button> */}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex m-auto items-center pt-7">
        <Logo />
      </div>
      <div className="relative">
        <Avatar className="absolute top-5 right-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
