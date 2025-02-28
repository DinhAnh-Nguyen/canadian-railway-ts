"use client";
import React, { useState, useEffect } from "react";
import { FeedbackData } from "@/data/feedbackData";

interface FeedbackFormProps {
  initialData?: FeedbackData | null;
  onSubmit: (data: FeedbackData) => void;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [message, setMessage] = useState(initialData?.message || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setMessage(initialData.message);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    onSubmit({
      id: initialData?.id || Date.now(),
      name,
      message,
      date: new Date().toLocaleDateString(),
      views: initialData?.views || 0,
    });

    setName("");
    setMessage("");
  };

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-white mb-2">
        {initialData ? "Edit Feedback" : "Add Feedback"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 bg-[#393A3E] text-white rounded-md border-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Feedback</label>
          <textarea
            className="w-full p-2 bg-[#393A3E] text-white rounded-md border-none"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {initialData ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
