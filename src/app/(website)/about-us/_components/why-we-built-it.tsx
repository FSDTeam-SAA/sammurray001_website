import Image from "next/image";

export default function WhyWeBuiltIt() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Why We Built It
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1 overflow-hidden rounded-lg w-[500px] h-64 sm:h-80 md:h-96 lg:h-[335px]">
            <Image
              src="/assets/about2.jpg"
              alt="Experience"
              width={1000}
              height={1000}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <h3 className="mb-6 text-2xl font-bold text-accent">Built From Experience</h3>
            <p className="mb-4 text-base leading-relaxed text-[#BFBFBF] sm:text-lg">
             We’ve been on both sides of the process — needing space and building it.
            </p>
            <p className="mb-4 text-base leading-relaxed text-[#BFBFBF] sm:text-lg">
              Property Nexus was born out of the frustration of not knowing who was looking, what was planned, or where the next opportunity would come from.
            </p>
            <p className="text-base leading-relaxed text-[#BFBFBF] sm:text-lg">
            Our mission is to bridge that gap with a platform that brings developers, owners, and tenants together at the right time — with privacy, simplicity, and trust at its core.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
