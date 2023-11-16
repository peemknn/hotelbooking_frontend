"use client";
import { Input } from "@/components/ui/input";
import LargeLogo from "@/../public/assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import userRegister from "@/lib/applibs/userRegister";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { log } from "console";

export default function RegisterForm() {
  const formSchema = z.object({
    displayName: z
      .string()
      .max(10, {
        message: "Display name must be at least 10 characters.",
      })
      .min(5, {
        message: "Display name must be 5 or more characters long.",
      }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(8, {
      message: "Password should be more than 8 characters.",
    }),
    tel: z.string().refine(
      (value) => {
        const phoneNumberRegex = /^\+?[0-9]+$/;
        return phoneNumberRegex.test(value);
      },
      {
        message: "Invalid phone number format.",
      }
    ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      tel: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let sentData = JSON.stringify({
      name: values.displayName,
      email: values.email,
      password: values.password,
      tel: values.tel,
    });
    try {
      const res = await userRegister(sentData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <div className="flex flex-col gap-10 pb-8 justify-center items-center">
        <Link href="/">
          <Image src={LargeLogo} alt="logo-img"></Image>
        </Link>
        <h1 className="text-md font-bold">Sign Up</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <div className="flex flex-col w-full items-center">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel className="text-sm">Display Name</FormLabel>
                  <FormControl className="max-w-xs  w-full ">
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. John Smith"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-subtitle" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. john.smith@email.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-[12px] text-subtitle" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full rounded-md  text-sm"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-[12px] text-subtitle" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel>Telephone No.</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. 086-345-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-subtitle" />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-8" variant="default" size="sm">
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
