export default function ChatNav() {

  // TODO: get project data from DB

  return (
    <div className="w-full h-16 border-b border-[#1A1D21] flex items-center justify-between px-6 bg-[#0D0F12]">
      <h1 className="text-lg font-semibold text-white truncate max-w-[60%]">Creator Economy SaaS Ideas</h1>
      <button className="bg-[#1A1D21] border border-[#2A2D31] hover:bg-[#23262A] transition-colors px-3 py-1.5 rounded-md text-sm font-medium text-white whitespace-nowrap">+ New Chat</button>
    </div>
  )
}