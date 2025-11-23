"use client"

import { useState } from "react"
import { Clock, Trash2 } from "lucide-react";
import { deleteProject } from "@/actions/project.action"
import { toast } from "react-hot-toast"

const GOOD_COLORS = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-400",
  "bg-purple-500",
];

function getRandomColor() {
  return GOOD_COLORS[Math.floor(Math.random() * GOOD_COLORS.length)];
}

export default function ProjectCard({
  title,
  description,
  updated,
  color,
  id,
}: {
  title: string;
  description: string;
  updated?: string;
  color?: string;
  id: string;
}) {

  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // FIX: random only generated client-side, once
  const [cardColor] = useState(() => color || getRandomColor());

  const handleDelete = async () => {
    setIsDeleting(true);

    const deleted = await deleteProject(id);

    if (deleted.success) {
      toast.success("Project Deleted Successfully");
    } else {
      toast.error("Couldn't Delete Project");
    }

    setIsDeleting(false);
    setShowModal(false);
  };

  return (
    <>
      {/* CARD */}
      <div className="relative w-full max-w-xs rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">

        {/* Delete icon */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow hover:bg-white transition"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>

        <div className={`h-48 ${cardColor}`}></div>

        <div className="p-4">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {description}
          </p>

          <div className="flex items-center gap-1 text-gray-500 text-sm mt-4">
            <Clock className="w-4 h-4" />
            Updated {updated}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl">

            <h2 className="text-lg font-semibold">Delete Project?</h2>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
