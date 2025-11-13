"use client"

import { MapPin, Mail, Phone } from "lucide-react"
import { useState } from "react"
import ContactForm from "../_components/contact-form"

export default function PropertyListing() {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#1a2847]">
      {/* Hero Image */}
      <div className="w-full overflow-hidden rounded-b-3xl">
        <img
          src="/images/image.png"
          alt="Modern Office Space in CBD"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Modern Office Space in CBD</h1>
          <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base mb-4">
            <MapPin size={18} />
            <span>Te Aro, Wellington</span>
          </div>
        </div>

        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details & About */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Details Card */}
            <div className="bg-[#1a2847] rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Type */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Type</p>
                  <p className="text-white text-lg font-semibold">Commercial</p>
                </div>
                {/* Size */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Size</p>
                  <p className="text-white text-lg font-semibold">850 sqm</p>
                </div>
                {/* Status */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Status</p>
                  <p className="text-white text-lg font-semibold">Under Construction</p>
                </div>
                {/* Consented */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Consented</p>
                  <p className="text-white text-lg font-semibold">Consented</p>
                </div>
                {/* Completion Date */}
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm mb-2">Completion Date</p>
                  <p className="text-white text-lg font-semibold">24 December 2025</p>
                </div>
              </div>
            </div>

            {/* About This Property Card */}
            <div className="bg-[#1a2847] rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About This Property</h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                A property deed is a written legal document that transfers ownership of a property from one party to
                another. It includes essential details such as the names of the current and new owners, a legal
                description of the property, and the date of the transfer. Deeds are signed by the current owner and
                typically require witnesses and a notary public.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Warranty Deed",
                    description:
                      "Guarantees that the seller owns the property free and clear and has the right to sell it. Provides the highest level of protection to the buyer.",
                  },
                  {
                    title: "Quitclaim Deed",
                    description:
                      "Transfers the seller's interest in the property without making any guarantees about the title. Often used in situations where the transfer is between family members or in less formal transactions.",
                  },
                  {
                    title: "Grant Deed",
                    description:
                      "Similar to a warranty deed but may not provide as much protection. It implies that the property has not been sold to anyone else.",
                  },
                  {
                    title: "Resort Deed",
                    description:
                      "Selling a resort property involves a unique set of considerations compared to traditional real estate transactions. Whether you're a resort owner looking to sell or an investor interested in acquiring a leisure property, understanding the intricacies of resort sales is crucial.",
                  },
                  {
                    title: "Financial Documentation",
                    description:
                      "Compile detailed financial records, including revenue, expenses, and profit margins. This documentation helps potential buyers assess the financial health of the resort.",
                  },
                  {
                    title: "Property Valuation",
                    description:
                      "Work with real estate professionals experienced in the hospitality industry to determine the fair market value of the resort. Consider the property's amenities, location, and revenue-generating potential.",
                  },
                  {
                    title: "Legal Compliance",
                    description:
                      "Ensure that all licenses, permits, and zoning regulations are up-to-date. Address any legal issues or concerns that might affect the sale.",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                      <span className="text-[#FF6B35] mt-1">•</span>
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base ml-6 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form & Agent Info */}
          <div className="space-y-6">
            {/* Add to Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-full bg-[#FF6B35] hover:bg-[#E55A24] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>+ Add To Wishlist</span>
            </button>

            {/* Contact Form Component */}
            <ContactForm />

            {/* Contact Information Card */}
            <div className="bg-[#1a2847] rounded-2xl p-6 sm:p-8">
              <h3 className="text-white text-lg font-bold mb-4">Contact Information</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A24] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Arlene McCoy</h4>
                  <p className="text-gray-400 text-sm">Property Agent</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <a
                  href="mailto:michelle.rivera@example.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#FF6B35] transition-colors"
                >
                  <Mail size={18} />
                  <span className="text-sm">michelle.rivera@example.com</span>
                </a>
                <a
                  href="tel:(509)5550103"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#FF6B35] transition-colors"
                >
                  <Phone size={18} />
                  <span className="text-sm">(509) 555-0103</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
