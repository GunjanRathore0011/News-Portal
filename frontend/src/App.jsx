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

function App() {

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute></PrivateRoute>} >
        <Route path="/dashboard" element={<Dashboard />} />
    
        </Route>
        <Route path="/news" element={<NewsArticle />} />
      </Routes>

      <Toaster />

      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
