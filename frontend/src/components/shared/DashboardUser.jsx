import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { deleteFailure, deleteStart, deleteSuccess, userSlice } from '@/redux/user/userSlice'
import { set } from 'react-hook-form'

import { ImCross } from "react-icons/im";

import { TiTick } from "react-icons/ti";

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
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';


const DashboardUser = () => {
  const { currentUser,error,loading } = useSelector(state => state.user)
    const navigate=useNavigate();
    const { toast } = useToast();
    const dispatch = useDispatch();

    const [allUser, setAllUser] = useState([])
    const userHandler=async()=>{
        try{
            const res = await fetch("/api/user/getUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data=await res.json();
            // console.log(data);

            if(res.ok){
                setAllUser(data.Users)
            }
            else{
                console.log("Response is not ok")
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        userHandler(); // Call function on mount
      }, []); // Empty dependency array ensures it runs only once
    
      useEffect(() => {
        // console.log(allUser)
      }, [allUser,currentUser]); // Logs only when `allUser` changes


    const deleteHandler = async (userId) => {
      // alert("clicked")
        dispatch(deleteStart());
        const res = await fetch(`/api/user/deleteUser/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();

        
        if (userId === currentUser._id) {   
          toast({ title: data.message })
          localStorage.removeItem("persist:root");
          // currentUser=null
          navigate("/sign-up"); 
        } 
        else if (res.ok) {
          toast({ title: data.message })
          dispatch(deleteFailure(data.message))
       }
        else{
          toast({title: data.message})
        }
        setAllUser(prevUsers => prevUsers.filter(user => user._id !== userId));
      }
  return (
    <div>
        <Table>
      <TableCaption>A list of your recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Joined On</TableHead>
          <TableHead>User image</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="">Email</TableHead>
          <TableHead className="">Admin</TableHead>
          <TableHead className="">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allUser.map((user) => (
          <TableRow key={user.user}>
            <TableCell className="">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{<img src={user.profilePicture} height={25} width={25} ></img>}</TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell className="">{user.email}</TableCell>
            <TableCell className="">

            {user.isAdmin? (<TiTick className='text-green-600 text-2xl' />):(<ImCross className='text-red-500' />)}

            </TableCell>
            <TableCell className="">
            <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className=" text-red-500 hover:underline" >
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete user from servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => { deleteHandler(user._id) }} className="bg-red-600">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}

export default DashboardUser