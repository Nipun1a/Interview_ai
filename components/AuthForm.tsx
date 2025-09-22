"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import FormField from "./FormField";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

interface AuthformProps {
  type: FormType;
}

const Authform: React.FC<AuthformProps> = ({ type }) => {
  const router = useRouter();
  const schema = authFormSchema(type);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "sign-in";

  const onSubmit = (values: z.infer<typeof schema>) => {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully!");
        router.push("/auth/sign-in");
      } else {
        toast.success("Signed in successfully!");
      }
      console.log(values);
    } catch (error) {
      console.error(error);
      toast.error(`Failed. Please try again. ${error}`);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      {/* --- Logo + Title --- */}
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center items-center">
          {/* ✅ Logo from /public */}
          <Image src="/logo.svg" alt="logo" height={38} width={38} />
          <h2 className="text-primary-100 text-xl font-semibold">
            Interview.AI
          </h2>
        </div>
      </div>

      {/* --- Subtitle --- */}
      <h3 className="text-lg font-medium text-center mt-4">
        Practice job interview with AI
      </h3>

      {/* --- Form --- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-6 form"
        >
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your name"
            />
          )}

          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />

          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <Button className="btn w-full" type="submit">
            {isSignIn ? "Sign in" : "Create an Account"}
          </Button>
        </form>
      </Form>

      {/* --- Auth switch link --- */}
      <p className="text-center mt-4">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <Link
          href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}
          className="text-blue-500 hover:underline ml-1"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default Authform;
