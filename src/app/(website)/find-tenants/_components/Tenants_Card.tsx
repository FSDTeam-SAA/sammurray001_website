"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import { useApp } from "@/lib/AppContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export interface Listing {
  [x: string]: any;
  id: string;
  image?: string;
  type: string;
  badge?: string;
  price: string;
  priceUnit?: string;
  area: string;
  name: string;
  description: string;
  location: string;
  number: string;
  user: string; // receiverId
  extraData?: {
    month?: string;
    extraLocation?: any;
  };
}

interface TenantsCardProps {
  listing: Listing;
  showFullCard?: boolean;
}

export default function TenantsCard({ listing, showFullCard }: TenantsCardProps) {
  const { user } = useApp();
  const router = useRouter();


  const { data: session } = useSession();
  const token = session?.user?.accessToken || ""; 
     const currentUserId = session?.user?.id;

  // ======== Access Control Logic ===========
  const hideFeatures =
    user?.activeInactiveSubcrib === "active" && user?.isSubscription === false;

  const showMessageButton =
    (user?.activeInactiveSubcrib === "inactive" && user?.isSubscription === false) ||
    (user?.activeInactiveSubcrib === "active" && user?.isSubscription === true);

  // ======== Create Conversation Mutation ===========
  const createConversationMutation = useMutation({
    mutationFn: async () => {
      if (!token) return toast.error("You must login first!");
       if (listing.user === currentUserId) return toast.error("You cannot message yourself!");
    

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: listing.user }),
      });

      if (!res.ok) throw new Error("Failed to create conversation");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Conversation created successfully!");
      router.push("/message");
    },
    onError: () => {
      toast.error("Failed to create conversation. Try again!");
    },
  });

  return (
    <Card className="overflow-hidden bg-[#070E28] border-none transition cursor-pointer group hover:scale-105 transform">

      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={listing.image || "/placeholder.svg"}
          alt={listing.name}
          width={1000}
          height={1000}
          className="w-full h-[220px] sm:h-[280px] md:h-[330px] rounded-[8px] object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5 space-y-3">

        {/* Name & Location */}
        <div className="flex justify-between items-center">
          <h3 className="text-white text-lg sm:text-xl md:text-xl font-semibold mb-2">
            {listing.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={16} />
            <span>{listing.location}</span>
          </div>
        </div>

        {/* Number & Area */}
        {!hideFeatures && (
          <div className="flex justify-between items-center text-[#BFBFBF] text-base font-normal">
            <span>{listing.number}</span>
            <span className="flex items-center gap-2">
              <Ruler size={16} /> Area: {listing.area}
            </span>
          </div>
        )}

        {/* Type & Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
          <p className="bg-gradient bg-clip-text text-transparent text-lg sm:text-xl font-semibold mb-1">
            {listing.type}
          </p>

          {!hideFeatures && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-1 text-white font-bold">
              {showFullCard && showMessageButton && (
                <>
                  {listing.price}
                  <span className="text-xs text-gray-400">.{listing.priceUnit}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Message Button */}
        {showFullCard && showMessageButton && (
          <div>
            <Button
              onClick={() => createConversationMutation.mutate()}
              className="bg-gradient w-full hover:bg-gradient/80 h-10 sm:h-10 md:h-[40px] px-6 sm:px-8 md:px-[43px] text-white text-sm flex items-center justify-center"
            >
              <MessageCircle size={16} className="mr-2" />
              Message
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
