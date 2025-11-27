"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Listing {
  id: string;
  image?: string;
  type: string;
  badge?: string;
  price: string;
  priceUnit?: string;
  area: string;
  title: string;
  description: string;
  location: string;
}

const WishListPage = () => {
  const [wishlist, setWishlist] = useState<Listing[]>([]);
  console.log(wishlist)

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const handleRemove = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // Trigger storage event so header updates
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Wish List</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400">No items in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {wishlist.map(listing => (
            <div key={listing.id} className="relative">
              <Link href={`/properti-Deatails/${listing.id}`}>
                <Card className="overflow-hidden bg-[#070E28] border-none transition cursor-pointer group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={listing.image?.[0] || "/placeholder.svg"}
                      alt={listing.title}
                      width={1000}
                      height={1000}
                      className="w-full h-[220px] sm:h-[280px] md:h-[300px] object-cover group-hover:scale-105 transition duration-300"
                    />
                    {listing.badge && (
                      <div className="absolute top-3 left-3 bg-gradient py-[6px] px-3 text-white rounded-[6px] text-sm font-normal">{listing.badge}</div>
                    )}
                  </div>
                  <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-2 sm:gap-0">
                      <p className="text-[#14B8A6] text-lg sm:text-xl font-semibold mb-1">{listing.type}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-1">
                        <span className="text-gray-400"><Ruler size={16} /></span>
                        <span className="text-gray-300">{listing.area}</span>
                        <span className="text-white font-bold">{listing.price}{listing.priceUnit && <span className="text-xs text-gray-400">.{listing.priceUnit}</span>}</span>
                      </div>
                    </div>
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">{listing.title}</h3>
                    <p className="text-[#BFBFBF] text-sm sm:text-base mb-3">{listing.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={16} />
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </Card>
              </Link>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(listing.id);
                }}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, Ruler, MessageCircle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// export interface Listing {
//   id: string;
//   user: string;
//   image?: string;
//   type: string;
//   badge?: string;
//   price: string;
//   priceUnit?: string;
//   area: string;
//   title: string;
//   description: string;
//   location: string;
//   agent?: {
//     name: string;
//     verified?: boolean;
//     isSubscription: boolean;
//     activeInactiveSubcrib: "active" | "inactive";
//   };
// }

// interface WishListPageProps {
//   listings: Listing[];
// }

// const WishListPage = () => {
//   const [wishlist, setWishlist] = useState<Listing[]>([]);
//   const router = useRouter();
//   const { data: session } = useSession();
//   const token = session?.user?.accessToken || "";
//   const currentUserId = session?.user?.id;

//   useEffect(() => {
//     const stored = localStorage.getItem("wishlist");
//     if (stored) setWishlist(JSON.parse(stored));
//   }, []);

//   const handleRemove = (id: string) => {
//     const updated = wishlist.filter(item => item.id !== id);
//     setWishlist(updated);
//     localStorage.setItem("wishlist", JSON.stringify(updated));
//     window.dispatchEvent(new Event("storage"));
//   };

//   const createConversation = async (receiverId: string) => {
//     if (!token) return toast.error("You must login first!");
//     if (receiverId === currentUserId) return toast.error("You cannot message yourself!");

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/conversation`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ receiverId }),
//       });
//       if (!res.ok) throw new Error("Failed to create conversation");
//       await res.json();
//       toast.success("Conversation created successfully!");
//       router.push("/message");
//     } catch (err) {
//       toast.error("Failed to create conversation. Try again!");
//     }
//   };

//   return (
//     <div className="min-h-screen container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">Wish List</h1>

//       {wishlist.length === 0 ? (
//         <p className="text-gray-400">No items in your wishlist yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
//           {wishlist.map(listing => {
//             const showMessageButton =
//               (listing.agent?.activeInactiveSubcrib === "active" && listing.agent.isSubscription) ||
//               (listing.agent?.activeInactiveSubcrib === "inactive" && !listing.agent.isSubscription);

//             return (
//               <div key={listing.id} className="relative">
//                 <Link href={`/properti-Deatails/${listing.id}`}>
//                   <Card className="overflow-hidden bg-[#070E28] border-none transition group cursor-pointer">
//                     <div className="relative overflow-hidden">
//                       <Image
//                         src={listing.image?.[0] || "/placeholder.svg"}
//                         alt={listing.title}
//                         width={1000}
//                         height={1000}
//                         className="w-full h-[220px] sm:h-[280px] md:h-[300px] object-cover group-hover:scale-105 transition duration-300"
//                       />
//                       {listing.badge && (
//                         <div className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-cyan-500 py-[6px] px-3 text-white rounded-[6px] text-sm font-normal shadow-lg">
//                           {listing.badge}
//                         </div>
//                       )}
//                     </div>

//                     <div className="pt-4 sm:pt-5 px-3 sm:px-4 md:px-5">
//                       <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-2 sm:gap-0">
//                         <p className="text-[#14B8A6] text-lg sm:text-xl font-semibold mb-1">
//                           {listing.type}
//                         </p>
//                         <div className="flex flex-wrap items-center gap-2 sm:gap-1">
//                           <Ruler size={16} className="text-gray-400" />
//                           <span className="text-gray-300">{listing.area}</span>
//                           <span className="text-white font-bold">
//                             {listing.price}
//                             {listing.priceUnit && (
//                               <span className="text-xs text-gray-400">/{listing.priceUnit}</span>
//                             )}
//                           </span>
//                         </div>
//                       </div>

//                       <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2 line-clamp-1">
//                         {listing.title}
//                       </h3>

//                       <p className="text-[#BFBFBF] text-sm sm:text-base mb-3 line-clamp-2">
//                         {listing.description}
//                       </p>

//                       <div className="flex justify-between items-center mb-3">
//                         <div className="flex items-center gap-2 text-sm text-gray-400">
//                           <MapPin size={16} />
//                           <span>{listing.location}</span>
//                         </div>

//                         {showMessageButton && (
//                           <Button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               createConversation(listing.user);
//                             }}
//                             className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 h-10 px-4 text-white font-medium flex items-center gap-2"
//                           >
//                             <MessageCircle size={16} />
//                             Message
//                           </Button>
//                         )}
//                       </div>

//                       {/* Agent info */}
//                       {listing.agent && (
//                         <div className="mt-2 text-sm text-gray-300">
//                           Managed by: <span className="text-white font-medium">{listing.agent.name}</span>
//                         </div>
//                       )}
//                     </div>
//                   </Card>
//                 </Link>

//                 {/* Remove Button */}
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handleRemove(listing.id);
//                   }}
//                   className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition"
//                 >
//                   X
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishListPage;
