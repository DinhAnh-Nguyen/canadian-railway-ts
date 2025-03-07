"use client";
import React from "react";
import { FeedbackData } from "@/data/feedbackData";

interface FeedbackTableProps {
  feedbackList: FeedbackData[];
  onEdit: (feedback: FeedbackData) => void;
  onDelete: (id: number) => void;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({
  feedbackList,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-md border bg-[#393A3E] p-4">
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">What do you like about the application?</th>
            <th className="p-2">How can we improve?</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <tr key={feedback.id} className="border-b border-gray-700">
                <td className="p-2">{feedback.name}</td>
                <td className="p-2">{feedback.date}</td>
                <td className="p-2">{feedback.likes}</td>
                <td className="p-2">{feedback.improvements}</td>
                <td className="p-2">
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => onEdit(feedback)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 text-red-400 hover:underline"
                    onClick={() => onDelete(feedback.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-400">
                No feedback available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
