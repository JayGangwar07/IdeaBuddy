"use client";

import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim()) return;
    onSend?.(value);
    setValue("");
  }

  return (
    <div className="w-full border-t h-24 border-neutral-800 bg-neutral-900 px-6 py-4 flex-shrink-0">
      <div className="flex items-center gap-3 rounded-2xl bg-neutral-800 border border-neutral-700 px-4 py-3">

        {/* Text Input */}
        <textarea
          className="w-full bg-transparent text-base text-white resize-none outline-none placeholder-neutral-500 leading-relaxed max-h-48"
          placeholder="Ask me anything…"
          rows={1}
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
