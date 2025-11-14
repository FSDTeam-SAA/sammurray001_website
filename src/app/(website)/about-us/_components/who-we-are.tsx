import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="border-t border-slate-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Who We Are</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-accent">A Smarter Way to Match Property and People</h3>
            <p className="mb-4 text-base leading-relaxed text-[#BFBFBF] sm:text-lg">
             Property Nexus is a digital platform built for the next generation of developers, investors, and business owners.Instead of waiting for space to hit the market, we make it easy to connect early — matching projects and tenants before the doors even open.
            </p>
            <p className="mb-4 text-base leading-relaxed text-[#BFBFBF] sm:text-lg">
             From commercial and industrial units to retail and office space, our goal is simple: to make finding and filling property faster, clearer, and more direct.
            </p>
          
          </div>

         <div className="relative overflow-hidden rounded-lg w-[500px] h-64 sm:h-80 md:h-96 lg:h-[335px]">
              <Image
              src="/assets/about1.jpg"
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
