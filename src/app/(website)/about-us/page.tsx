"use client"
import HeroSection from "./_components/hero-sectiont"
import OurVision from "./_components/our-vision"
import WhatMakesUsDifferent from "./_components/what-makes-us-different"
import WhoWeAre from "./_components/who-we-are"
import WhyWeBuiltIt from "./_components/why-we-built-it"


export default function Home() {
  return (
    <main className="">
 
      <HeroSection />
      <WhoWeAre />
      <WhyWeBuiltIt />
      <WhatMakesUsDifferent/>
      <OurVision />
    
    </main>
  )
}
