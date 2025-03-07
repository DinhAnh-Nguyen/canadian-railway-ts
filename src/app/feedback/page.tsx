"use client";
import React, { useState } from "react";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { FeedbackData, initialFeedbackData } from "@/data/feedbackData";
import { PlusCircle, Search } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] =
    useState<FeedbackData[]>(initialFeedbackData);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");

  const handleAddFeedback = (feedback: FeedbackData) => {
    setFeedbackList((prev) =>
      prev.some((f) => f.id === feedback.id)
        ? prev.map((f) => (f.id === feedback.id ? feedback : f))
        : [
            ...prev,
            {
              ...feedback,
              likes: feedback.likes || "No response provided.",
              improvements: feedback.improvements || "No response provided.",
            },
          ]
    );
    setShowForm(false);
  };

  const handleEditFeedback = (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
    setShowForm(true);
  };

  const handleDeleteFeedback = (id: number) => {
    setFeedbackList((prev) => prev.filter((f) => f.id !== id));
  };

  // Filter feedback based on search input
  const filteredFeedbackList = feedbackList.filter(
    (f) =>
      f.name.toLowerCase().includes(filter.toLowerCase()) ||
      f.message.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#1e1e1e] text-white relative">
      <h1 className="text-2xl font-bold mb-4">User Feedback</h1>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          className="w-300 p-2 bg-[#393A3E] text-white rounded-md border-none pl-10"
          placeholder="Filter Feedback"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      <FeedbackTable
        feedbackList={filteredFeedbackList}
        onEdit={handleEditFeedback}
        onDelete={handleDeleteFeedback}
      />

      {/* Floating Add Feedback Button (Bottom Right) */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setSelectedFeedback(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          style={{ width: "56px", height: "56px", zIndex: 50 }}
        >
          <PlusCircle size={24} />
        </button>
      </div>

      {/* Feedback Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <FeedbackForm
            initialData={selectedFeedback}
            onSubmit={handleAddFeedback}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}
