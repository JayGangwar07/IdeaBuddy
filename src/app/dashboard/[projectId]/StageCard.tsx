"use client"

import React from "react";
import Link from "next/link";



export default function StageCard({ name = "Stage Name", redirect = "#" }) {
  return (
    <div className="w-full flex justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 sm:p-10 max-w-xl w-full text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-wide mb-6">
          {name}
        </h2>

        <Link
          href={redirect}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          Chat
        </Link>
      </div>
    </div>
  );
}
