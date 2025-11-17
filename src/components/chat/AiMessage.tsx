"use client";

import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AIMessageProps {
  message: string;
  time?: string;
  avatarSrc?: string;
}

export default function AIMessage({
  message = "hi",
  time,
  avatarSrc,
}: AIMessageProps) {
  const src = avatarSrc || "/ai.png";

  return (
    <div className="w-full flex items-start gap-3 rounded-lg p-4 bg-[#0F1117] border border-white/10">
      {/* Avatar */}
      <div className="flex-shrink-0">
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

      {/* Message */}
      <div className="flex flex-col gap-1 max-w-full text-white leading-relaxed">
        {time && <div className="text-sm text-white/70">{time}</div>}

        <div className="prose prose-invert max-w-none prose-p:my-1 prose-strong:font-semibold prose-code:bg-neutral-900 prose-code:px-1 prose-code:rounded break-words whitespace-pre-wrap overflow-hidden">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
