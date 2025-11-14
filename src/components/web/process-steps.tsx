"use client"

export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Post",
      description:
        "Show the world what you need or what you're offering. List your property or space requirement in minutes with a simple guided form. No jargon, no hassle, just clear, professional visibility.",
    },
    {
      number: "02",
      title: "Match",
      description:
        "Let our intelligent system do the work for you. It automatically finds the best matches based on location, property type, size, and budget, bringing the right opportunities straight to you.",
    },
    {
      number: "03",
      title: "Connect",
      description:
        "Turn matches into meaningful conversations. Chat directly, share details, and build real partnerships all within a secure, modern platform designed to make real estate transactions effortless and authentic.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white mx-4 md:mx-3 rounded-[32px] !mt-[120px] ">
      <div className=" container mx-auto py-[80px]">
        <div className="text-center mb-12">
          <p className="bg-text-gradient bg-clip-text text-transparent text-xl font-midium mb-2">
            working process
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#000000]">
            Simple easy steps to get started
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-[50px]">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={` p-6 transition
        ${index < 2 ? " lg:border-r border-gray-300" : ""}`}
            >
              <h3 className="text-xl font-bold text-[#000000] mb-2">{step.title}</h3>
              <p className="text-[#595959] text-base font-normal leading-[150%] mb-4">
                {step.description}
              </p>
              <p className="text-4xl font-bold text-[#B6E9E3]">{step.number}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
