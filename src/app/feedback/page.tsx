"use client";
import React, { useState } from "react";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { FeedbackData, initialFeedbackData } from "@/data/feedbackData";
import { PlusCircle } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<FeedbackData[]>(
    initialFeedbackData
  );
  const [selectedFeedback, setSelectedFeedback] = useState<
    FeedbackData | null
  >(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("recent");

  const handleAddFeedback = (feedback: FeedbackData) => {
    setFeedbackList((prev) =>
      prev.some((f) => f.id === feedback.id)
        ? prev.map((f) => (f.id === feedback.id ? feedback : f))
        : [...prev, feedback]
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

  // Sorting the feedback list
  const sortedFeedbackList = [...feedbackList].sort((a, b) => {
    if (filter === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (filter === "mostViewed") {
      return b.views - a.views;
    }
    return 0;
  });

  return (
    <div className="p-6 bg-background text-foreground relative">
      <div className="flex justify-between items-center mb-4">
        {/* Filter Dropdown (Top Left) */}
        <select
          className="p-2 bg-[#393A3E] text-white rounded-md border-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="recent">Recent</option>
          <option value="mostViewed">Most Viewed</option>
        </select>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">User Feedback</h1>
      <FeedbackTable
        feedbackList={sortedFeedbackList}
        onEdit={handleEditFeedback}
        onDelete={handleDeleteFeedback}
      />

      {/* Floating Add Feedback Button (Bottom Right) */}
      <button
        onClick={() => {
          setSelectedFeedback(null);
          setShowForm(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg transform transition hover:scale-110 flex items-center justify-center"
        style={{ width: "56px", height: "56px" }}
      >
        <PlusCircle size={24} />
      </button>

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
