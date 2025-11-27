// components/PropertyGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];        // array of image URLs (your thumble array)
  title: string;           // for alt text
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Limit thumbnails to max 10
  const thumbnails = images.slice(0, 10);

  const slides = images.map((src) => ({
    src,
    width: 1920,
    height: 1080,
  }));

  return (
    <>
      {/* ====== Main Big Image ====== */}
      <div className="relative w-full overflow-hidden rounded-3xl mb-6 cursor-pointer group">
        <Image
          src={images[mainIndex] || "/assets/card1.png"}
          alt={title}
          width={1200}
          height={800}
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          onClick={() => setLightboxOpen(true)}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white font-medium bg-black/50 px-4 py-2 rounded">
            Click to enlarge ({images.length} photos)
          </p>
        </div>
      </div>

      {/* ====== Thumbnails (max 10) ====== */}
      {thumbnails.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600">
          {thumbnails.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainIndex(idx)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-4 transition-all ${
                mainIndex === idx ? "border-orange-500 shadow-lg" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                width={120}
                height={120}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover hover:opacity-90 transition"
              />
            </button>
          ))}
        </div>
      )}

      {/* ====== Full-screen Lightbox ====== */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={mainIndex}
        slides={slides}
        on={{ view: ({ index }) => setMainIndex(index) }}
        plugins={[]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
          iconPrev: () => <ChevronLeft className="w-8 h-8" />,
          iconNext: () => <ChevronRight className="w-8 h-8" />,
        }}
        labels={{ Close: "Close (Esc)" }}
      />
    </>
  );
}