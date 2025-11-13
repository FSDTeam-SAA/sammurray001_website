"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "../../_components/auth-layout"

interface LoginPageProps {
  onSwitchToRegister: () => void
  onSwitchToForgotPassword: () => void
}

export default function LoginPage({ onSwitchToRegister, onSwitchToForgotPassword }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <AuthLayout imagePosition="right">
      <div className="bg-[#FFFFFF33]/20 rounded-xl px-3 lg:p-8 space-y-6 w-full lg:w-[550px]">
        {/* Header */}
        <div>
          <h2 className="text-[25px] lg:text-[40px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
            Hello, Welcome!
          </h2>
          <p className="text-[#FFFFFF] text-sm lg:text-base">
            Please enter your details below to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-[#FFFFFF] text-sm lg:text-base mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="hello@example.com"
              className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] lg:h-[51px] rounded-[4px]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#FFFFFF] text-sm lg:text-base mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] lg:h-[51px] rounded-[4px] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label htmlFor="remember" className="flex items-center text-[#BFBFBF] text-xs lg:text-sm cursor-pointer">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-[#2c3d5c] border-gray-600 rounded mr-2"
              />
              Remember me now
            </label>

            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text text-xs lg:text-sm font-semibold"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-[35px] lg:h-[51px] text-white font-semibold rounded-lg text-sm lg:text-base"
            style={{
              background: `linear-gradient(90deg, #0078B8 0%, #229F99 101.35%), 
                           linear-gradient(338.72deg, rgba(0,118,180,0.2) 14.2%, rgba(51,164,150,0.2) 83.33%)`,
              backgroundBlendMode: "overlay",
            }}
          >
            Log In
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs lg:text-sm text-gray-300 pb-4">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}
