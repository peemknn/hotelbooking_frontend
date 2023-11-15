import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HamburgerSvg } from "./SideTab/Hamburger";
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

export default function SideTab() {
  return (
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
  );
}
