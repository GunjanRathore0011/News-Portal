import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { useToast } from '@/hooks/use-toast'
import { Title } from '@radix-ui/react-toast'
import GoogleAuth from '@/components/shared/GoogleAuth'

const formSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" }).max(50),
  email: z
    .string()
    .email({ message: "Invalid email address" }).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }).max(50),

})

const SignUpForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const API_BASE = import.meta.env.VITE_API_URL;

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      setLoading(true);
      setErrMessage(null);

      const res = await fetch(`${API_BASE}/v1/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.success == false) {
        setLoading(false);
        toast({ title: "Sign up Failed! Please try again." })
        return setErrMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        toast({ title: "Sign up successfully." })
        navigate("/sign-in")
      }

    }
    catch (error) {
      setErrMessage(error.message);
      toast({ title: "Something went wrong." })
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5 '>

        {/* left side */}

        <div className='flex-1 '>
          <Link to={'/'} className='font-bold text-2xl sm:text-4xl flex flex-wrap'>
            <span className='text-slate-500'>Tech</span>
            <span className='text-slate-900'>Trendz</span>

          </Link>
          <h2 className='text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12 '>Create new account</h2>
          <p className='text-slate-500 text-[14px] font-medium leading-[-140%] md:text-[16px] md:font-normal mt-2 '>Welcome to Tech Trendz, Please provide your details.</p>
        </div>

        {/* right side */}

        <div className='flex-1 '>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <FormControl>
                      <Input type="text" placeholder="Username"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input type="email" placeholder="xyz@gmail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input type="password" placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />



              <Button type="submit" className='bg-blue-500 w-full' >
                {
                  loading ? (<span className='animate-pulse'>Loading...</span>)
                    :
                    (<span>Sign Up</span>)
                }
              </Button>

              <GoogleAuth></GoogleAuth>
            </form>
          </Form>

          <div className='flex gap-2 text-sm mt-5' >
            <span>Have an account?</span>
            <Link className='text-blue-500' to={'/sign-in'}>Sign In</Link>
          </div>

          {/* Display error message if exists */}
          {errMessage && (
            <p className="text-red-500 mt-5">{errMessage}</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default SignUpForm