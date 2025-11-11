"use client"

import ChatNav from "./ChatNav.tsx"
import ChatInput from "./ChatInput.tsx"
import ChatMessages from "./ChatMessages.tsx"

export default function ChatWindow() {

  return (
    <div className="flex flex-col h-[92vh] w-full overflow-y-hidden">

      <ChatNav />

      <ChatMessages />

      <ChatInput />

    </div>
  )
}
