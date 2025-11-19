"use client";

import { MapPin, Mail, Phone } from "lucide-react";

export default function PropertySkeleton() {
  return (
    <div className="min-h-screen container mx-auto py-[24px] animate-pulse">
      {/* Hero Image */}
      <div className="w-full h-56 sm:h-72 md:h-96 lg:h-[400px] bg-gray-800 rounded-3xl mb-8" />

      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div className="space-y-4">
              <div className="h-10 bg-gray-800 rounded-lg w-4/5" />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-600" />
                  <div className="h-5 bg-gray-800 rounded w-52" />
                </div>
                <div className="h-11 bg-[#E57525]/60 rounded-lg w-44" />
              </div>
            </div>

            {/* Property Details Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827]/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-20" />
                    <div className="h-7 bg-gray-600 rounded w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827]/50 space-y-5">
              <div className="h-8 bg-gray-700 rounded w-64" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded" />
                <div className="h-4 bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-700 rounded w-11/12" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
                <div className="h-4 bg-gray-700 rounded w-10/12" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Form Skeleton */}
            <div className="p-6 rounded-xl bg-[#111827]/50 space-y-5">
              <div className="h-8 bg-gray-700 rounded w-48 mb-6" />
              <div className="space-y-4">
                <div className="h-10 bg-gray-700 rounded" />
                <div className="h-10 bg-gray-700 rounded" />
                <div className="h-24 bg-gray-700 rounded" />
                <div className="h-12 bg-[#E57525]/70 rounded-lg" />
              </div>
            </div>

            {/* Agent Card */}
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl space-y-6">
              <div className="h-6 bg-gray-700 rounded w-40" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35]/80 to-[#E55A24]/80" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-600 rounded w-36" />
                  <div className="h-4 bg-gray-700 rounded w-28" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-600" />
                  <div className="h-4 bg-gray-700 rounded w-56" />
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-600" />
                  <div className="h-4 bg-gray-700 rounded w-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
