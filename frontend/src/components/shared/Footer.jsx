import React from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init();

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-11" data-aos="fade-up" data-aos-duration="1000">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About Us */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm">
            We are committed to delivering the best services and information. Our mission is to enrich lives through exceptional digital experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/news" className="hover:text-white transition">News Articles</Link></li>
            <li><Link to="/" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400 text-sm">123 Street Name, City, Country</p>
          <p className="text-gray-400 text-sm">Email: info@example.com</p>
          <p className="text-gray-400 text-sm">Phone: +91 234 567 890</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6" data-aos="fade-in" data-aos-delay="400">
        {/* Social Links */}
        <p className="text-center text-gray-500 text-sm mb-3">Follow us on:</p>
        <div className="flex justify-center space-x-5 text-gray-400 text-sm" data-aos="fade-in" data-aos-delay="500">
          <a href="https://www.linkedin.com/in/gunjanrathore11" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/in/gunjanrathore11" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.linkedin.com/in/gunjanrathore11" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.linkedin.com/in/gunjanrathore11" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Tech Trendz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
