import Link from "next/link";
import { Button } from "../ui/button";
import logo from "./../../../public/assets/logo/textlogo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/hotels">
      <Image src={logo} alt="logo" className=""></Image>
    </Link>
  );
};

export default Logo;
