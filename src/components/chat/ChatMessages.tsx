import AiMessage from "./AiMessage.tsx"
import UserMessage from "./UserMessage.tsx"

export default function ChatMessage() {

  const messages = [
    {
      role: "assistant",
      message: "Hi! I am your cofounder ready to babysit you",
      number: 1
    },
    {
      role: "user",
      message: "Brainstorm some micro SaaS ideas",
      number: 2
    }
  ]


  return (
    <div className="flex-1 overflow-y-auto bg-[#101622] text-white">
      {/*   MESSAGES    */}
      <div className="p-4 space-y-4">
        {
          messages.map((msg) => {
            if (msg.role === "assistant") {
              return <AiMessage
                key={msg.number}
                message={msg.message}
              />
            }
            if (msg.role === "user") {
              return <UserMessage
              key={msg.number}
                message={msg.message}
              />
            }
          })
        }
      </div>
    </div>
  )

}