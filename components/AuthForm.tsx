"use client"; // ✅ This component runs on the client (React), not the server

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

// ✅ Import Firebase client SDK (for sign-up/sign-in)
import { auth } from "@/Firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// ✅ Import server actions (to save user in Firestore & handle session)
import { signIn, signUp } from "@/lib/actions/auth.action";

// Auth form type: either "sign-in" or "sign-up"
type FormType = "sign-in" | "sign-up";

// ✅ Dynamic schema: requires `name` only for sign-up
const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

// Props for the form (decides whether it's sign-in or sign-up)
interface AuthformProps {
  type: FormType;
}

const Authform: React.FC<AuthformProps> = ({ type }) => {
  const router = useRouter();
  const schema = authFormSchema(type);

  // ✅ Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === "sign-in";

  // ✅ Handle form submission
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (type === "sign-up") {
        // --- SIGN UP ---
        const { name, email, password } = values;

        // 1. Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // 2. Call server action to save user details in Firestore
        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!, // non-null since required in sign-up
          email,
        });

        // 3. Handle server response
        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully!");
        router.push("/auth/sign-in"); // redirect to sign-in page
      } else {
        // --- SIGN IN ---
        const { email, password } = values;

        // 1. Sign in with Firebase client SDK
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // 2. Get ID token to pass to server
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in failed, please try again");
          return;
        }

        // 3. Call server action to set session cookie
        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully!");
        router.push("/"); // redirect to homepage
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed. Please try again. ${error.message || error}`);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      {/* --- Logo + Title --- */}
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center items-center">
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

      {/* --- Auth Form --- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-6 form"
        >
          {/* Name field only for sign-up */}
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your name"
            />
          )}

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {/* Submit button */}
          <Button className="btn w-full" type="submit">
            {isSignIn ? "Sign in" : "Create an Account"}
          </Button>
        </form>
      </Form>

      {/* --- Switch between sign-in/sign-up --- */}
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
