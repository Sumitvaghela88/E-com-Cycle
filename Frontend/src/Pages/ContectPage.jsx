import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Banner */}
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518655048521-f130df041f66')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <Mail className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-600 mt-1">support@bikestore.com</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <Phone className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Phone</h3>
            <p className="text-gray-600 mt-1">+91 98765 43210</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <MapPin className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Address</h3>
            <p className="text-gray-600 mt-1">123 Cycle Street, Surat, India</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <Clock className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Working Hours</h3>
            <p className="text-gray-600 mt-1">Mon - Sat: 9 AM - 7 PM</p>
          </div>
        </div>

        {/* Form Section (Centered) */}
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md mt-1"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md mt-1"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-md mt-1 h-32"
                placeholder="Write your message..."
                required
              />
            </div>

            <button
              className="bg-blue-600 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
