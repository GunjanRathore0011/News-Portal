import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-gray-800 text-white py-8'>

            <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About us */}
                <div>
                    <h2 className='text-lg font-semibold mb-4 '>About Us</h2>
                    <p className='text-gray-400 text-sm'>We are committed to delivering the best services and information. Our mission is to enrich lives through exceptional digital experinces.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className='text-lg font-semibold mb-4 '>Quick Links</h2>
                    <ul className='space-y-2 text-gray-400'>
                        <li>
                            <Link to={'/'} className='hover:text-white'>Home</Link>
                        </li>
                        <li>
                            <Link to={'/about'} className='hover:text-white'>About Us</Link>
                        </li>
                        <li>
                            <Link to={'/news'} className='hover:text-white'>News Articles</Link>
                        </li>
                        <li>
                            <Link to={'/'} className='hover:text-white'>Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact us */}
                <div>
                    <h2 className='text-lg font-semibold mb-4 '>Contact Us</h2>
                    <p className='text-gray-400 text-sm'>123 Street Name,City,Country</p>
                    <p className='text-gray-400 text-sm'>Email info@example.com</p>
                    <p className='text-gray-400 text-sm'>Phone: +91 234 567 890</p>
                </div>

            </div>

            {/* Social Media and Copyright */}
            <div className='mt-8 border-t border-gray-700 pt-6 '></div>
            <p className='text-center text-gray-500 text-sm'>Follow us on:</p>
            <div className='flex justify-center space-x-4 mt-3'>
                <a href='#' className='text-gray-500 text-sm hover:text-white'>Facebook</a>
                <a href='#' className='text-gray-500 text-sm hover:text-white'>Twitter</a>
                <a href='#' className='text-gray-500 text-sm hover:text-white'>LinkedIn</a>
                <a href='#' className='text-gray-500 text-sm hover:text-white'>Instagram</a>
            </div>

            <p className='mt-4 text-center text-gray-500'>&copy; {new Date().getFullYear()} Tech Trendz. All rights reserved.</p>

        </div>
    )
}

export default Footer