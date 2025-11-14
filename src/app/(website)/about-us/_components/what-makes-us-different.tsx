import Image from "next/image";

export default function WhatMakesUsDifferent() {
  return (
    <section className=" py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">What Makes Us Different </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-accent">Designed for Modern Property Relationships</h3>
            <ul className="list-disc pl-5">
              <li className="text-[18px] text-[#BFBFBF] font-normal"> Smarter Matching: AI-assisted listings that connect projects and tenants based on real requirements.</li>
              <li className="text-[18px] text-[#BFBFBF] font-normal">Focus on Commercial Growth: Built for industrial, office, retail, and commercial projects — not just residential.</li>
              <li className="text-[18px] text-[#BFBFBF] font-normal"> Privacy First: Verified profiles, secure messaging, and clear control over what’s shared.</li>
              <li className="text-[18px] text-[#BFBFBF] font-normal"> Expanding Network: Starting in New Zealand and Australia — designed to scale globally.</li>
            </ul>
          
          </div>

         <div className="relative overflow-hidden rounded-lg w-[500px] h-64 sm:h-80 md:h-96 lg:h-[335px]">
              <Image
              src="/assets/about3.jpg"
              alt="Team collaboration"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
