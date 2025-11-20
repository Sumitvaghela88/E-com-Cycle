import React from "react";
import {
  Facebook,
  Instagram,
  YouTube,
  Twitter,
  LinkedIn,
  KeyboardArrowDown,
} from "@mui/icons-material";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="
      backdrop-blur-xl
      bg-white/30
      border-t border-white/40
      text-gray-800
      px-6 md:px-20
      py-14
      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    "
    >
      {/* ===== Top Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-12">
        
        {/* Left Text + Buttons */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 leading-snug drop-shadow-sm">
            Start your way <br /> to shopping here
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 mb-10">
            <button
              className="
              px-6 py-2 text-sm font-medium
              border border-gray-700
              rounded-xl
              bg-white/30
              backdrop-blur-md
              hover:bg-black hover:text-white
              transition-all duration-200
              shadow-sm
            "
            >
              BUY NOW
            </button>

            <button
              className="
              px-6 py-2 text-sm font-medium
              border border-gray-700
              rounded-xl
              bg-white/30
              backdrop-blur-md
              hover:bg-black hover:text-white
              transition-all duration-200
              shadow-sm
            "
            >
              SELL NOW
            </button>
          </div>

          {/* Region & Currency */}
          <div className="flex flex-col gap-4 text-sm font-semibold">
            <div className="flex items-center gap-1 bg-white/40 px-3 py-2 rounded-lg border border-gray-300/60 backdrop-blur-md">
              <span>San Francisco Bay</span>
              <KeyboardArrowDown fontSize="small" />
            </div>

            <div className="flex items-center gap-1 bg-white/40 px-3 py-2 rounded-lg border border-gray-300/60 backdrop-blur-md">
              <span>$ USD</span>
              <KeyboardArrowDown fontSize="small" />
            </div>
          </div>
        </div>

        {/* Right Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
          
          {/* About */}
          <div>
            <h3 className="font-bold mb-5 uppercase tracking-wide text-gray-700">
              About
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Government Relations</li>
              <li>Company Info</li>
              <li>About eBay</li>
              <li>Verified Rights Owner</li>
              <li>Investors</li>
              <li>Advertise with Us</li>
              <li>Careers</li>
              <li>Policies</li>
              <li>News</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold mb-5 uppercase tracking-wide text-gray-700">
              Help
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Seller Information Center</li>
              <li>Resolution Center</li>
              <li>Terms of Use</li>
              <li>Abuse</li>
              <li>Legal</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Safety */}
          <div>
            <h3 className="font-bold mb-5 uppercase tracking-wide text-gray-700">
              Safety
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Avoid Scams & Fraud</li>
              <li>Personal Safety Tips</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="border-t border-white/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-24 opacity-90 drop-shadow-md"
        />

        {/* Social Icons */}
        <div className="flex space-x-6 text-gray-700">
          <Twitter className="hover:text-black transition cursor-pointer" />
          <Facebook className="hover:text-black transition cursor-pointer" />
          <Instagram className="hover:text-black transition cursor-pointer" />
          <YouTube className="hover:text-black transition cursor-pointer" />
          <LinkedIn className="hover:text-black transition cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
