"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ForgotPasswordFormProps {
  onSubmit: (role: "tenant" | "supplier") => void
  onBackToLogin: () => void
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // you can handle OTP send logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[25px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
          Forgot Password
        </h2>
        <p className="text-[#FFFFFF] text-base leading-relaxed">
          Enter the email address associated with your account. We’ll send you an OTP to your email.
        </p>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[#FFFFFF] text-base mb-2">Email Address</label>
        <Input
          type="email"
          placeholder="hello@example.com"
          className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[46px] rounded-[4px]"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-[46px] text-white font-semibold rounded-lg disabled:opacity-50 disabled:text-white"
        style={{
          background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%), 
                       linear-gradient(338.72deg, rgba(0, 118, 180, 0.2) 14.2%, rgba(51, 164, 150, 0.2) 83.33%)`,
          backgroundBlendMode: "overlay",
        }}
      >
        Send OTP
      </Button>

      {/* Back Link */}
      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full text-gray-400 hover:text-gray-300 text-sm py-2"
      >
        Back to Login
      </button>
    </form>
  )
}
