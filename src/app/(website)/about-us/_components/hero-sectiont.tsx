export default function HeroSection() {
  return (
    <section className="">
      {/* Background image container */}
      <div
        className="relative h-[543px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/aboutUs.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#00000052]"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div>
            <p className="text-base font-medium bg-gradient bg-clip-text text-transparent">
              About Property Nexus
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-[140%] text-white sm:text-[30px] lg:text-[40px] max-w-[600px]">
              Connecting People, Projects, and Possibility.
            </h1>

            <p className="mb-8 text-base text-[#FFFFFF] sm:text-base font-normal leading-[150%] max-w-[620px]">
              Property Nexus is a digital marketplace that connects people and businesses seeking property or space with
              those offering it. We don't own or manage the listed properties and are not a real estate agency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-[40px]">
              <button className="rounded-lg bg-gradient px-[53px] h-[56px] font-semibold text-white hover:bg-gradient/95 transition-colors">
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
