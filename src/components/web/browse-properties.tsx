"use client"

import ListingCard, { Listing } from "../Reuseable_cards/PropertiesCard"
import { Button } from "@/components/ui/button"

export default function BrowseProperties() {
  const properties: Listing[] = [
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
    {
      id: 5,
      image: "/assets/card1.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Large Industrial Warehouse",
      description: "Spacious warehouse suitable for logistics and storage",
      location: "Te Aro, Wellington",
    },
    {
      id: 6,
      image: "/assets/card1.png",
      type: "Commercial",
      badge: "Top pick",
      price: "$35,000,000",
      priceUnit: "USD",
      area: "4000 sqm",
      title: "Empty Modern Office Space",
      description: "Ready-to-use office space in prime location",
      location: "Te Aro, Wellington",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-14">
          <p className="bg-text-gradient bg-clip-text text-transparent text-xl font-medium mb-2">
            Latest Listings
          </p>
          <h2 className="text-[22px] md:text-4xl font-bold text-white ">
            Browse all available properties and opportunities
          </h2>
        </div>

        {/* Grid of Listing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {properties.map((property) => (
            <ListingCard key={property.id} listing={property} />
          ))}
        </div>

        {/* Explore More Button */}
        <div className="text-center mt-8">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            Explore More →
          </Button>
        </div>
      </div>
    </section>
  )
}
