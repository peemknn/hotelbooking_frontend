"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import LargeLogo from "@/../public/assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(email, password);

      const login = await signIn("credentials", {
        email: email.current,
        password: password.current,
        redirect: false,
      });
      setIsLoading(false);
      if (login?.ok) {
        console.log("Login success");
        router.push("/hotels");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            onChange={(e) => (email.current = e.target.value)}
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
            onChange={(e) => (password.current = e.target.value)}
          />
        </div>
      </div>
      <Button onClick={onSubmit} variant="default" size="sm">
        Login
      </Button>
      <p className="text-xs py-5">
        Don't have an account yet ?{" "}
        <span>
          <Link
            href="/register"
            className="text-indigo-600 hover:underline underline-offset-4"
          >
            Signup
          </Link>
        </span>
      </p>
    </div>
  );
}
