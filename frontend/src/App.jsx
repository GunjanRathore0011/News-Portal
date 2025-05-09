import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignInForm from "./auth/forms/SignInForm"
import SignUpForm from "./auth/forms/SignUpForm"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import NewsArticle from "./pages/FakeNews"
import About from "./pages/About"
import Header from "./components/shared/Header"
import { Toaster } from "./components/ui/toaster"
import Footer from "./components/shared/Footer"
import PrivateRoute from "./components/shared/PrivateRoute"
import CreatePost from "./components/shared/DashboardCreatePost"
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute"
import PostDetails from "./pages/PostDetails"
import ScrollToTop from "./components/shared/ScrollToTop"
import Search from "./pages/Search"
import FakeNews from "./pages/FakeNews"
import Summarize from "./pages/Summarize"
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  return (
    <BrowserRouter>
      <Header></Header>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search></Search>}></Route>

        <Route element={<PrivateRoute></PrivateRoute>} >
        <Route path="/dashboard" element={<Dashboard />} />
     
        </Route>
       
        <Route path="/fake-news" element={<FakeNews />} />
        <Route path="/summarize" element={<Summarize />} />

        <Route path="/post/:postSlug" element={<PostDetails></PostDetails>} ></Route>


        <Route element={<AdminPrivateRoute></AdminPrivateRoute>} >
        {/* <Route path="/create-post" element={<CreatePost/>}/> */}
        </Route>
      


      </Routes>

      

      <Toaster />

      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
