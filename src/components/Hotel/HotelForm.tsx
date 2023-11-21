"use client";
import { Input } from "@/components/ui/input";
import LargeLogo from "@/../public/assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import userRegister from "@/lib/applibs/user/userRegister";
import { signIn, useSession } from "next-auth/react";
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
import addHotel from "@/lib/applibs/hotels/addHotel";
import updateHotel from "@/lib/applibs/hotels/updateHotel";

export default function HotelForm({
  hotelId,
  name,
  method,
  initialData,
  submitHandler,
}: {
  hotelId?: string;
  name: string;
  method: string;
  initialData?: any;
  submitHandler?: any;
}) {
  const { data: session } = useSession();
  const thaiPostalCodeRegex = /^[0-9]{5}$/;
  const formSchema = z.object({
    name: z.string().refine((value) => value.trim() !== "", {
      message: "Name is required.",
    }),
    address: z.string().refine((value) => value.trim() !== "", {
      message: "Address is required.",
    }),
    district: z.string().refine((value) => value.trim() !== "", {
      message: "District is required.",
    }),
    province: z.string().refine((value) => value.trim() !== "", {
      message: "Province is required.",
    }),
    postalcode: z.string().refine((value) => thaiPostalCodeRegex.test(value), {
      message: "Invalid Thai postal code format.",
    }),
    tel: z
      .string()
      .refine(
        (value) => {
          const phoneNumberRegex = /^\+?[0-9]+$/;
          return phoneNumberRegex.test(value);
        },
        {
          message: "Invalid phone number format.",
        }
      )
      .refine((value) => value.trim() !== "", {
        message: "Phone number is required.",
      }),
    picture: z.string().refine((value) => value.trim() !== "", {
      message: "Picture is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      address: initialData?.address || "",
      district: initialData?.district || "",
      province: initialData?.province || "",
      postalcode: initialData?.postalcode || "",
      tel: initialData?.tel || "",
      picture: initialData?.picture || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let sentData = JSON.stringify({
      name: values.name,
      address: values.address,
      district: values.district,
      province: values.province,
      postalcode: values.postalcode,
      tel: values.tel,
      picture: values.picture,
    });
    console.log(sentData);

    if (method == "post") {
      try {
        const res = await addHotel(sentData, session?.user.token);
      } catch (error) {
        console.log(error);
      }
    } else if (method == "put") {
      try {
        const res = await updateHotel(hotelId, sentData, session?.user.token);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full w-max-xs">
      <div className="flex flex-col gap-10 pb-8 justify-center items-center">
        <Link href="/">
          <Image src={LargeLogo} alt="logo-img"></Image>
        </Link>
        <h1 className="text-md font-bold">{name} hotel</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full flex flex-col items-center"
        >
          <div className="flex flex-col w-full items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel className="text-sm">Hotel Name</FormLabel>
                  <FormControl className="max-w-xs  w-full ">
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. Centara Grand"
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
              name="address"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel className="text-sm">Address</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. 254 Sukumvit Rd."
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
              name="district"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. Pathum Wan"
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
              name="province"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel className="text-sm">Province</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. Bangkok"
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
              name="postalcode"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. 10600"
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
                  <FormLabel className="text-sm">Tel</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. 086-456-6789"
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
              name="picture"
              render={({ field }) => (
                <FormItem className="form-control w-full max-w-xs">
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-md  text-sm"
                      placeholder="ex. GoogleDrive link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-subtitle" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4"
              onClick={submitHandler}
              variant="default"
              size="sm"
            >
              {name} Hotel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
