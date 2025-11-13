"use client"

import { useRouter } from "next/navigation"
import RegisterPage from "./_components/register-page"

export default function RegisterRoute() {
  const router = useRouter()

  return (
    <main className=" h-auto">
      <RegisterPage onSwitchToLogin={() => router.push("/login")} />
    </main>
  )
}
