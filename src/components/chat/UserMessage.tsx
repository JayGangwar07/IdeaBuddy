import Image from "next/image";
import { useUser } from "@clerk/nextjs"

export default function UserMessage({ message }: string) {

  const user = useUser()

  return (
    <div className="w-full flex flex-grow justify-end px-6 py-3">
      <div className="flex items-end gap-4 max-w-[75%]">

        {/* Message bubble */}
        <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-br-md text-[15px] leading-relaxed shadow-md">
          {message}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shadow-sm">
          <Image
            src={user.image || "/ai.png"}
            alt="User"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>

      </div>
    </div>
  );
}
