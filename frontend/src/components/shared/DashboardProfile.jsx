import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../ui/button'

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
import { FaUser } from 'react-icons/fa'


const formSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }).max(50),

})

async function onSubmit(values) {
    console.log("Submitted Data:", values);

}


const DashboardProfile = () => {
    const { currentUser } = useSelector(state => state.user)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: currentUser.email,
            password: "",
        },
    })


    return (
        <div className='max-w-lg mx-auto p-3 w-full'>

            <div className='flex flex-col items-center space-y-3 m-5'>
                <h1 className='text-2xl font-bold text-slate-800'>Update Your Profile</h1>
                <div className='h-36 w-36 border-8 border-gray-300  rounded-full flex items-center justify-center '>
                <FaUser size={100}></FaUser>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>         
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
                                <FormControl>
                                    <Input type="password" placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className='w-full bg-green-500' >
                        Update
                    </Button>
                    
                    <div className='text-red-600 flex justify-between ' >
                        <span className='cursor-pointer'>Delete</span>
                        <span className='cursor-pointer'>Sign Out</span>
                    </div>

                </form>
            </Form>


        </div>
    )
}

export default DashboardProfile