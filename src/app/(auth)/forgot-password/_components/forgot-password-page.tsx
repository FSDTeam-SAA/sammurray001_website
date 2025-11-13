"use client"

import { useState } from "react"
import AuthLayout from "../../_components/auth-layout"
import ForgotPasswordForm from "./forgot-password-form"

interface ForgotPasswordPageProps {
  onSwitchToLogin: () => void
}

export default function ForgotPasswordPage({ onSwitchToLogin }: ForgotPasswordPageProps) {
  const [currentStep, setCurrentStep] = useState<"email" | "otp" | "password">("email")

  const handleRoleAndEmail = () => {
    setCurrentStep("otp")
  }

  return (
    <AuthLayout>
      <div
        className="
          flex flex-col justify-center items-center
          w-full min-h-screen
          px-4 sm:px-6 md:px-8
          bg-transparent
        "
      >
        <div
          className="
            bg-[#FFFFFF33]/20
            rounded-2xl
            backdrop-blur-md
            p-6 sm:p-8
            w-full lg:w-[550px]
            shadow-lg
          "
        >
          {currentStep === "email" && (
            <ForgotPasswordForm
              onSubmit={handleRoleAndEmail}
              onBackToLogin={onSwitchToLogin}
            />
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
