import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignInForm from "./auth/forms/SignInForm"
import SignUpForm from "./auth/forms/SignUpForm"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import NewsArticle from "./pages/NewsArticle"
import About from "./pages/About"
import Header from "./components/shared/Header"
import { Toaster } from "./components/ui/toaster"
import Footer from "./components/shared/Footer"
import PrivateRoute from "./components/shared/PrivateRoute"
import CreatePost from "./components/shared/CreatePost"
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute"
import PostDetails from "./pages/PostDetails"
import ScrollToTop from "./components/shared/ScrollToTop"

function App() {

  return (
    <BrowserRouter>
      <Header></Header>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute></PrivateRoute>} >
        <Route path="/dashboard" element={<Dashboard />} />
     
        </Route>
       
        <Route path="/news" element={<NewsArticle />} />
        <Route path="/post/:postSlug" element={<PostDetails></PostDetails>} ></Route>


        <Route element={<AdminPrivateRoute></AdminPrivateRoute>} >
        <Route path="/create-post" element={<CreatePost/>}/>
        </Route>
      


      </Routes>

      

      <Toaster />

      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
