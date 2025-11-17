"use client";

import React, { useEffect, useRef } from "react";
import AiMessage from "./AiMessage.tsx";
import UserMessage from "./UserMessage.tsx";

export default function ChatMessages({ messages, isLoading }) {
  const bottomRef = useRef(null);

  /*
  // Auto-scroll to bottom on update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
*/
  const thinkingMessages = [
    "Cofounder is thinking...",
    "Brewing something clever...",
    "Cooking...",
    "Let Him Cook Now..."
  ];
  const randomThinking =
    thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];

  return (
    <div className="flex-1 overflow-y-auto bg-[#101622] text-white">
      {/* Messages */}
      <div className="p-4 space-y-4">
        {messages.map((msg) => {
          if (msg.role === "assistant") {
            return (
              <AiMessage key={msg.number} message={msg.content || ""} />
            );
          }
          if (msg.role === "user") {
            return (
              <UserMessage key={msg.number} message={msg.content || ""} />
            );
          }
          return null;
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="px-4 py-2 rounded-2xl bg-neutral-800 w-fit">
            <span className="animate-pulse text-neutral-400">
              {randomThinking}
            </span>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
