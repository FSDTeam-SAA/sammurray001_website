"use client"

import ListingCard, { Listing } from "../Reuseable_cards/PropertiesCard"


export default function FeaturedListings() {
  const listings: Listing[] = [
    {
      id: 1,
      image: "/assets/card1.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Modern Office Space in CBD",
      description: "New commercial development in central Wellington",
      location: "Te Aro, Wellington",
    },
    {
      id: 2,
         image: "/assets/card1.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Industrial Warehouse in CBD",
      description: "Large warehouse ideal for storage and logistics",
      location: "Te Aro, Wellington",
    },
    {
      id: 3,
        image: "/assets/card1.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Fashion Retail Store",
      description: "Premium retail space for fashion brand",
      location: "Te Aro, Wellington",
    },
    {
      id: 4,
        image: "/assets/card1.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Tall Office Building",
      description: "High-rise office building in the central business district",
      location: "Te Aro, Wellington",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="container mx-auto">
        <div className="mb-[56px]">
          <p className="bg-text-gradient bg-clip-text text-transparent text-xl font-medium mb-2">
            Featured Listings
          </p>

          <h1 className="text-[22px] md:text-4xl font-bold text-white flex items-center gap-2 ">
           Premium properties and opportunities
          </h1>
        </div>

        {/* Grid of Listing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  )
}
