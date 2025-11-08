import React from "react";
import {
  Facebook,
  Instagram,
  YouTube,
  Twitter,
  LinkedIn,
  KeyboardArrowDown,
} from "@mui/icons-material";
import ebayLogo from "../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-[#F4F4F4] text-gray-800 px-6 md:px-20 py-12 border-t border-gray-200">
      {/* ===== Top Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Left Text + Buttons */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 leading-snug">
            Start your way <br /> to shopping here
          </h2>

          <div className="flex flex-wrap gap-6 mb-10">
            <button className="border border-gray-800 px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition">
              BUY NOW
            </button>
            <button className="border border-gray-800 px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition">
              SELL NOW
            </button>
          </div>

          {/* Region & Currency Selectors */}
          <div className="flex flex-col gap-4 text-m text-semibold">
            <div className="flex items-center ">
              <span>San Francisco Bay</span>
              <KeyboardArrowDown fontSize="small" />
            </div>

            <div className="flex items-center ">
              <span>$ USD</span>
              <KeyboardArrowDown fontSize="small" />
            </div>
          </div>
        </div>

        {/* Right Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-6">about</h3>
            <ul className="space-y-1 text-gray-600">
              <li>government relations</li>
              <li>company info</li>
              <li>about ebay</li>
              <li>verified rights owner</li>
              <li>investors</li>
              <li>advertise with us</li>
              <li>careers</li>
              <li>policies</li>
              <li>news</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6">help</h3>
            <ul className="space-y-1 text-gray-600">
              <li>seller information center</li>
              <li>resolution center</li>
              <li>terms of use</li>
              <li>abuse</li>
              <li>legal</li>
              <li>faq</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6">safety</h3>
            <ul className="space-y-1 text-gray-600">
              <li>avoid scams & fraud</li>
              <li>personal safety tips</li>
              <li>privacy policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="border-t border-black-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <img
          src={ebayLogo}
          alt="eBay Logo"
          className="w-20 h-auto object-contain"
        />

        {/* Social Icons */}
        <div className="flex space-x-5 text-gray-600">
          <Twitter className="hover:text-black cursor-pointer" />
          <Facebook className="hover:text-black cursor-pointer" />
          <Instagram className="hover:text-black cursor-pointer" />
          <YouTube className="hover:text-black cursor-pointer" />
          <LinkedIn className="hover:text-black cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
