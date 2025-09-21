"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import React from 'react'

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),

})
}


interface AuthformProps {
  type: string;
}

const Authform: React.FC<AuthformProps> = ({ type }) => {

  const formSchema = authFormSchema(type as FormType);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      
    }
    console.log(values)
  }
  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Interview.AI</h2>
        </div>
      </div>
      <h3>practice job Interview with AI</h3>
      <p className="mb-4">Form type: <strong>{type}</strong></p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="w-full space-y-6 mt-4 form ">
          { !isSignIn && <p>Name</p> }
          <p>Email</p>
          <p>Password</p>

          <Button className="btn" type="submit">
            {isSignIn ? 'Sign in' : 'Create an Account'}
          </Button>
        </form>
      </Form>
      <p className="text-center">
        {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        <Link href = {isSignIn ? "/auth/sign-up" : "/auth/sign-in"} className="text-blue-500 hover:underline ml-1">
          {isSignIn ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}


export default Authform