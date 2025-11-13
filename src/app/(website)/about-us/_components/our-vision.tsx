export default function OurVision() {
  return (
    <section className="border-t border-slate-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Our Vision</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="relative overflow-hidden rounded-lg">
            <img src="/futuristic-city-visualization-with-digital-network.jpg" alt="Vision" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-accent">Shaping the Future of Property Development</h3>
            <p className="mb-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              We believe in a world where property and people connect seamlessly — where developers have the network,
              transparency, and direct opportunities to find next moves and drive smarter decisions.
            </p>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Property Nexus isn't just a platform—it's a community. It's where the next generation of property leaders
              connect and collaborate. That's our conclusion.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Join the Nexus →
          </button>
        </div>
      </div>
    </section>
  )
}
