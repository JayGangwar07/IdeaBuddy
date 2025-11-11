
import Image from "next/image"
import React from "react";

interface AIMessageProps {
  message: string;
  time?: string;
  avatarSrc?: string;
}

export default function AIMessage({ message = "hi", time, avatarSrc }: AIMessageProps) {
  const src = avatarSrc || "/ai.png";

  return (
    <div className="w-full flex items-start gap-3 rounded-lg p-4 bg-[#0F1117] border border-white/10">
      <div className="flex-shrink-0">
        {/* explicit relative + fixed size container for the avatar */}
        <div className="relative w-10 h-10 rounded-md overflow-hidden border border-white/10">
          <Image
            src={src}
            width={40}
            height={40}
            alt="AI avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 max-w-full">
        {time && <div className="text-sm text-white/70">{time}</div>}
        <p className="text-white leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}