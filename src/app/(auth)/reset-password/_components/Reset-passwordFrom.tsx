"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "../../_components/auth-layout"

export default function UpdatePasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle password update logic here
  }

  return (
    <AuthLayout imagePosition="right">
      <div className="bg-[#FFFFFF33]/20 rounded-xl px-4 py-5 md:p-8 space-y-6 w-full lg:w-[550px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-[25px] lg:text-[40px] font-bold mb-2 bg-gradient-to-r from-[#0078B8] to-[#229F99] text-transparent bg-clip-text">
              Update Password
            </h2>
            <p className="text-white text-sm lg:text-base">Create your new password below</p>
          </div>

          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-white text-sm lg:text-base mb-2">Create New Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] lg:h-[51px] rounded-[4px] pr-10"
                  required
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

            {/* Confirm Password */}
            <div>
              <label className="block text-white text-sm lg:text-base mb-2">Confirm New Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-[#BFBFBF] text-white placeholder:text-[#BFBFBF] h-[35px] lg:h-[51px] rounded-[4px] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-[35px] lg:h-[51px] text-white font-semibold rounded-lg
              bg-[linear-gradient(90deg,#0078B8_0%,#229F99_101.35%),linear-gradient(338.72deg,rgba(0,118,180,0.2)_14.2%,rgba(51,164,150,0.2)_83.33%)]
              hover:opacity-90 disabled:opacity-60 text-sm lg:text-base"
          >
            Change Password
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
