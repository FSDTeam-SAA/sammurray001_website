"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ListingCard, { Listing } from "@/components/Reuseable_cards/PropertiesCard";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
interface ApiProperty {
  _id: string;
  type: { name: string };
  title: string;
  description?: string;
  price: number;
  size?: string;
  thumble: string;
  address: string;
  city: string;
  areaya?: string;
  country: string;
}

interface ApiResponse {
  success: boolean;
  data: ApiProperty[];
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  isSubscription: boolean;
  subscriptionExpiry: string;
  iat: number;
  exp: number;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

const SkeletonCard = () => (
  <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-64 bg-gray-800" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-700 rounded w-32" />
      <div className="h-9 bg-gray-700 rounded w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-4/5" />
      </div>
      <div className="flex justify-between">
        <div className="h-5 bg-gray-700 rounded w-40" />
        <div className="h-5 bg-gray-700 rounded w-24" />
      </div>
    </div>
  </div>
);

export default function FindSpacePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  const session = useSession();
  const token = session.data?.user?.accessToken || "";
  let isSubscriber = false;
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      isSubscriber = decoded.isSubscription;
    } catch (err) {
      console.error("Token decode failed", err);
    }
  }

  // =======================
  // Fetch Properties
  // =======================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<ApiResponse>({
    queryKey: ["properties", search, location, type, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("searchTerm", search);
      if (location) params.append("city", location);
      if (type) params.append("type", type);
      if (size) params.append("size", size);

      const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property?${params.toString()}`;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(url, { method: "GET", headers });
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  const listings: Listing[] =
    data?.data?.map((p): Listing => ({
      id: p._id,
      image: p.thumble || "/assets/fallback.jpg",
      type: p.type?.name || "Property",
      badge: "New",
      price: formatPrice(p.price),
      priceUnit: "USD",
      area: p.size || "N/A",
      title: p.title,
      description: p.description || "No description available",
      location: p.areaya ? `${p.areaya}, ${p.city}` : p.city,
    })) || [];

  // =======================
  // Handle search button
  // =======================
  const handleSearch = () => {
    refetch();
  };

  return (
    <section className="container mx-auto py-10 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] sm:text-[40px] font-bold text-white">
          Find Your Perfect Space
        </h1>
        <p className="text-[#BFBFBF] mt-2">
          Browse available properties and post your requirements
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
        <div>
          <label className="block text-white mb-2">Search</label>
          <Input
            placeholder="Keywords, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 bg-transparent border-white/30 text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12 bg-transparent border-white/30 text-white">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dhaka">Dhaka</SelectItem>
              <SelectItem value="Chittagong">Chittagong</SelectItem>
              <SelectItem value="Cox's Bazar">Cox&apos;s Bazar</SelectItem>
              <SelectItem value="Sylhet">Sylhet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-white mb-2">Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-12 bg-transparent border-white/30 text-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Office">Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-white mb-2">Size (sqft)</label>
          <Input
            placeholder="e.g. 1000"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="h-12 bg-transparent border-white/30 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="lg:col-span-1 flex items-end">
          <Button className="w-full h-12 bg-gradient" onClick={handleSearch}>
            Search Properties
          </Button>
        </div>
      </div>

      {/* Property List */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-400 text-lg">
            Failed to load properties.
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-xl">
            No properties found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isSubscriber={isSubscriber}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
