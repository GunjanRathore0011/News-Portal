import React from 'react'
import { Button } from '../ui/button'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '@/firebase'
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess } from '@/redux/user/userSlice'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
const GoogleAuth = () => {
    const { toast } = useToast();
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_API_URL;


  const auth = getAuth(app)
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })
    try {
      const firebaseResponse = await signInWithPopup(auth, provider)
      // console.log("Yeh hai firebase ka response", firebaseResponse);
      // connecting with the api
      const values = {
        userName: firebaseResponse.user.uid,
        email: firebaseResponse.user.email,
        password: firebaseResponse.user.uid,
        profilePicture: firebaseResponse.user.photoURL,
      }
      const res = await fetch(`${API_BASE}/v1/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success == false) {
        toast({ title: "Sign in Failed! Please try again." })
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data.user))
        toast({ title: "Sign in successfully." })
        navigate("/")
      }
      console.log(data);
    } catch (error) {
      console.log("error in sign up", error)
    }
  }
  return (
    <div>
      <Button type='button' className="bg-green-500 w-full" onClick={handleGoogleClick} >Continue with Google</Button>
    </div>
  )
}
export default GoogleAuth