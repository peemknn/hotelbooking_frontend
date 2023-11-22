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
import { useEffect, useState } from "react";
import getUserProfile from "@/lib/applibs/user/getUserProfile";

export default function SideTab() {
  const [profileData, setProfileData] = useState<any>(null);
  const { data: session } = useSession();

  const getProfile = async () => {
    if (session && session.user.token) {
      try {
        const res = await getUserProfile(session.user.token);
        setProfileData(res.data);
      } catch (error) {
        console.error(error);
        setProfileData(null);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

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
      {profileData && (
        <div className="relative">
          <div className="absolute top-7 right-6">
            <label
              tabIndex={0}
              className={`w-8 aspect-square rounded-full  flex items-center justify-center text-white bg-slate-400  cursor-pointer font-mono shadow-sm`}
            >
              {profileData?.name.charAt(0).toUpperCase()}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
