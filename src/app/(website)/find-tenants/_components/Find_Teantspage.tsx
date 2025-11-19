"use client";

import { useSession } from "next-auth/react";
import TenantsCard, { Listing } from "./Tenants_Card";
import { jwtDecode } from "jwt-decode";
import SkeletonCard from "./SkeletonCard";
import { useQuery } from "@tanstack/react-query";



    interface ListingData {
      _id: string;
      user: {
        fullName: string;
        profileImage: string;
      };
      type: {
        name: string;
      };
      badge: string;
      price: number;
      priceUnit: string;
      size: string;
      description: string;
      city: string;
      country: string;
      number: string;
      mounth: string;
      month: string;
      extraLocation: string;
      extaraLocation: string;
    }

interface TokenPayload {
  id: string;
  role: string;
  email: string;
  isSubscription: boolean;
}



const Find_Teantspage: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken || null;

  let isSubscription = false;
  if (token) {
    try {
      const decoded: TokenPayload = jwtDecode(token);
      isSubscription = decoded.isSubscription || false;
    } catch (err) {
      console.error("Invalid token :", err);
    }
  }

  // React Query fetch function
  const fetchListings = async (): Promise<Listing[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listing`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch listings");

    const data = await res.json();

    return (data.data || []).map((item:ListingData ) => ({
      id: item._id,
      name: item.user?.fullName || "Unknown",
      image: item.user?.profileImage || "/placeholder.svg",
      type: item.type?.name || "N/A",
      badge: item.badge,
      price: item.price ? `$${item.price}` : "N/A",
      priceUnit: item.priceUnit,
      area: item.size || "N/A",
      description: item.description || "No description available",
      location: `${item.city || ""}, ${item.country || ""}`.trim() || "Location not specified",
      number: item.number || "",
      extraData: isSubscription
        ? {
            month: item.mounth || item.month,
            extraLocation: item.extraLocation || item.extaraLocation,
          }
        : undefined,
    }));
  };

  // React Query hook
  const { data: listings, isLoading, isError } = useQuery<Listing[]>({
    queryKey: ["listings", token], 
    queryFn: fetchListings,
    staleTime: 1000 * 60, 
  });

  return (
    <section className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-[32px] sm:text-[40px] font-bold text-white">
          Find Tenants
        </h1>
        <p className="text-base font-normal text-[#BFBFBF]">
          Find your Tenant with thousands of active seekers
        </p>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : isError
          ? <p className="text-center text-gray-400 col-span-full">Failed to load listings.</p>
          : listings && listings.length > 0
          ? listings.map((listing) => (
              <TenantsCard
                key={listing.id}
                listing={listing}
                showFullCard={!!token && isSubscription} 
              />
            ))
          : <p className="text-center text-gray-400 col-span-full">No listings found.</p>
        }
      </div>
    </section>
  );
};

export default Find_Teantspage;
