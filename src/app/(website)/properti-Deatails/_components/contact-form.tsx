"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="bg-[#1a2847] rounded-2xl p-6 sm:p-8">
      <h3 className="text-white text-xl font-bold mb-6">Send Inquiry</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Name Here"
            className="w-full bg-[#0f1729] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35] transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            className="w-full bg-[#0f1729] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35] transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(509) 555-0106"
            className="w-full bg-[#0f1729] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35] transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
        >
          Send
        </button>
      </form>

      {/* Avatar Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A24] flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BCD4] to-[#0097A7] flex items-center justify-center text-white font-bold text-sm">
          S
        </div>
      </div>
    </div>
  )
}
