"use client";

import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Props {
  formattedPrice: string | undefined;
  id: string | string[];
}

export default function ContactForm({ formattedPrice, id }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const sesseion=useSession()
  const token=sesseion.data?.user?.accessToken 
  // React Query Mutation
  const mutation = useMutation({
    mutationFn: async (data: {
      propertyId: string | string[];
      fullName: string;
      email: string;
      phone: string;
    }) => {
  

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Something went wrong" }));
        throw new Error(error.message || "Failed to submit form");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Your inquiry has been sent successfully!");
      // Optional: reset form
      setFormData({ fullName: "", email: "", phone: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send inquiry. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    mutation.mutate({
      propertyId:id,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });
  };

  return (
    <div className="bg-[#FFFFFF]/10 rounded-2xl p-6 sm:p-4">
      <h3 className="bg-text-gradient bg-clip-text text-transparent text-2xl font-bold">
        For Sale
      </h3>
      <h2 className="text-[32px] font-bold text-white mb-4">${formattedPrice}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-white text-base mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Name Here"
            required
            className="w-full bg-transparent border border-[#BFBFBF] rounded-[4px] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFBFBF]/80 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-white text-base mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            required
            className="w-full bg-transparent border border-[#BFBFBF] rounded-[4px] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFBFBF]/80 transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white text-base mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(509) 555-0106"
            required
            className="w-full bg-transparent border border-[#BFBFBF] rounded-[4px] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#BFBFBF]/80 transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-gradient hover:bg-gradient/80 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}