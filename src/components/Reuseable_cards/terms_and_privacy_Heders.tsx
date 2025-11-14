"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  backgroundUrl: string;
}

export default function PageHeader({
  title,
  subtitle,
  lastUpdated,
  backgroundUrl,
}: PageHeaderProps) {
  return (
    <section
      className="relative bg-cover bg-center h-[420px] flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center px-4 sm:px-6 lg:px-8">
        {subtitle && <p className="mt-2 text-base  text-[#E8F8F6] mb-3">{subtitle}</p>}
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#FFFFFF]">{title}</h1>
        {lastUpdated && <p className="mt-2 text-sm text-white">Last updated: {lastUpdated}</p>}
      </div>
    </section>
  );
}
