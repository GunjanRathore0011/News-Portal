import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
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
import { useToast } from '@/hooks/use-toast'
import { deleteFailure, deleteStart, deleteSuccess, signOutSuccess, updateFailure, updateStart, updateSuccess } from '@/redux/user/userSlice'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



const formSchema = z.object({
    userName: z
        .string()
        .min(3, { message: "Username must be atleast 3 characters" }).max(20),
    email: z
        .string()
        .email({ message: "Invalid email address" }).max(50),
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }).max(50),

})




const DashboardProfile = () => {
    const { currentUser,error,loading } = useSelector(state => state.user)

    const { toast } = useToast();
    const dispatch = useDispatch();

    const API_BASE = import.meta.env.VITE_API_URL;


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            email: currentUser.email,
            password: "",
        },
    })
    async function onSubmit(values) {
        try {

            dispatch(updateStart())

            const userId = currentUser._id;
            // console.log(userId);
            const res = await fetch(`${API_BASE}/user/update/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            // console.log(data);
            if (!res.ok) {
                toast({ title: data.message })
                dispatch(updateFailure(data.message))
            }

            if (res.ok) {
                toast({ title: "User profile updated successfully." })
                dispatch(updateSuccess(data.user))
            }


        }
        catch (error) {
            console.log("Error in update ", error);
        }
    }

    const deleteHandler = async () => {

        dispatch(deleteStart());
        const userId = currentUser._id;
        const res = await fetch(`${API_BASE}/user/delete/${userId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();

        if (!res.ok) {
            toast({ title: data.message })
            dispatch(deleteFailure(data.message))
        }

        if (res.ok) {
            toast({ title: "User account deleted successfully" });
            dispatch(deleteSuccess());
        }
    }

    const signOutHandler = async () => {
        try {
            const res=await fetch(`${API_BASE}/user/signOut`,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();

            if(res.ok){
                dispatch(signOutSuccess());
                toast({title: data.message})
            }
            else{
                toast({title: data.message});
            }
        }
        catch(error) {
            console.log("Error in signout",error);
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>

            <div className='flex flex-col items-center space-y-3 m-5'>
                <h1 className='text-2xl font-bold text-slate-800'>Update Your Profile</h1>
                <div className='h-36 w-36 border-8 border-gray-300  rounded-full flex items-center justify-center '>
                    <FaUser size={94} className='text-slate-600'></FaUser>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="userName"
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

                    <Button className='w-full bg-green-500' disabled={loading} type="submit">
                        {loading ? "Updating..." : "Update Profile"}
                    </Button>

                    <div className='text-red-600 flex justify-between ' >
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className='cursor-pointer' >Delete User</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600" onClick={deleteHandler}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button variant="ghost" className='cursor-pointer' onClick={signOutHandler} >Sign Out</Button>
                    </div>

                </form>
            </Form>


        </div>
    )
}

export default DashboardProfile