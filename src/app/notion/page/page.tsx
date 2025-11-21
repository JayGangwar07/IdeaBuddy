"use client";

import { NotionRenderer } from "react-notion-x";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";


export default function NotionPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notion/page");
        const json = await res.json();
        console.log("recordMap:", json);
        setData(json);
      } catch (err) {
        console.error("fetch error:", err);
      }
    }

    load();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <NotionRenderer
        recordMap={data}
        fullPage={true}
        darkMode={true}
      />
    </div>

  );
}
