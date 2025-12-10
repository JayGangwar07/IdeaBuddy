"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createProject } from "@/actions/project.action";

export default function NewProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    await createProject(formData.name, formData.description);
    setLoading(false);

    setFormData({ name: "", description: "" });
    setErrors({});
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      {/* New Project Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-[320px] h-[314px] rounded-xl border border-dashed border-gray-300
        flex flex-col justify-center items-center hover:bg-gray-50 transition cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-3xl">
          +
        </div>
        <p className="mt-3 font-medium text-gray-700">New Project</p>
        <p className="text-sm text-gray-500">Start a new SaaS idea</p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Create New Project
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Start building something amazing
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  placeholder="e.g., AI Fitness Planner"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    ⚠ {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
                  placeholder="Describe your project goals..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all"
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
