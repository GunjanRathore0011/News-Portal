import React from 'react'
import { Link } from 'react-router-dom'
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

const formSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" }).max(50),
  email: z
    .string()
    .min({ message: "Invalid email address" }).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }).max(50),

})

const SignUpForm = () => {

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
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                Sign up
                </Button>
            </form>
          </Form>

          <div className='flex gap-2 text-sm mt-5' >
              <span>Have an account?</span>
                <Link className='text-blue-500' to={'/sign-in'}>Sign In</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpForm