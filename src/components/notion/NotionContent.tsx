"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function LinkedNotionContent({
  linkedUrl,
  onRefresh,
}: {
  linkedUrl: string | null;
  onRefresh?: () => void;
}) {

  const searchParams = useSearchParams();
  const notion = searchParams.get("notion");

  // local state to hold input and confirmed iframe URL
  const [inputUrl, setInputUrl] = useState(linkedUrl ?? "");
  const [iframeUrl, setIframeUrl] = useState("https://foul-giraffe-abb.notion.site/2f61e6ec892342beb7fcac766cbcaf68?v=ddecb9cd020c49378565ab6022989305&amp;source=copy_link");

  if (notion) {
    return (
      <div className="h-screen flex flex-col">
        <main className="bg-white flex flex-col items-center justify-center flex-1 h-full w-full">

          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              title="Linked Notion Page"
              className="w-full h-full border-0"
            />
          ) : (
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://notion.so"
              className="block w-64 h-12 bg-white/80 rounded-xl px-4 border-2 border-black"
            />
          )}
          <button
            onClick={() => setIframeUrl(inputUrl)}
            className="text-black font-semibold"
          >
            Load
          </button>
        </main>

        <div className="w-full flex items-center justify-center h-16 bg-green-600">
          
        </div>
      </div>
    );
  }

  function onConnect() {
    window.open(
      "https://api.notion.com/v1/oauth/authorize?client_id=2a0d872b-594c-8018-9055-003761d6bf8c&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fnotion-callback",
      "_blank"
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-white border-l overflow-hidden">

      <main className="h-[84vh] overflow-hidden">
        {linkedUrl ? (
          <iframe
            src={linkedUrl}
            title="Linked Notion Page"
            className="w-full h-full border-0"
          />
        ) : (
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center p-6 text-center text-gray-500">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">🔗</div>
              <p className="text-lg font-medium">No Notion page linked</p>

              <button
                onClick={onConnect}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Connect Notion</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="flex-none p-3 border-t flex items-center justify-center bg-white">
        <button
          onClick={() => (onRefresh ? onRefresh() : window.location.reload())}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-200 text-gray-700 font-medium"
          aria-label="Refresh Notion"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Refresh</span>
        </button>
      </footer>
    </div>
  );
}
