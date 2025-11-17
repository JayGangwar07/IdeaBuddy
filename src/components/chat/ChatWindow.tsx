"use client";

import React, { useState } from "react";
import ChatNav from "./ChatNav.tsx";
import ChatMessages from "./ChatMessages.tsx";
import { Send } from "lucide-react";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am your cofounder ready to babysit you",
      number: 1,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = {
      role: "user",
      content: input,
      number: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    if (!res.ok || !res.body) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response.",
          number: Date.now(),
        },
      ]);
      setIsLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let aiText = "";
    const aiMsgNumber = Date.now();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", number: aiMsgNumber },
    ]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      aiText += chunk;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.number === aiMsgNumber ? { ...msg, content: aiText } : msg
        )
      );
    }
    
    // TODO: Save To DB

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-[92vh] w-full overflow-y-hidden">
      <ChatNav />
      <ChatMessages messages={messages} isLoading={isLoading} />

      <div className="w-full border-t h-24 border-neutral-800 bg-neutral-900 px-6 py-4 flex-shrink-0">
        <div className="flex items-center gap-3 rounded-2xl bg-neutral-800 border border-neutral-700 px-4 py-3">
          <textarea
            className="w-full bg-transparent text-base text-white resize-none outline-none placeholder-neutral-500 leading-relaxed max-h-48"
            placeholder="Ask me anything…"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
