"use client";
import Modal from "@/components/modal";
import React, { useState } from "react";

type Schedule = {
  id: number;
  description: string;
  status: string;
  assigned_to: string;
  created_by: string;
  due_date: string;
  piroty: string;
}
export default function Schedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-end ">
        <div className="flex px-4 ">
          <button
            className="bg-blue-600 w-32 h-10 rounded-full cursor-pointer "
            onClick={handleSchedule}
          >
            Schedule
          </button>
        </div>
        
        <div className="flex px-4">
          <button className="bg-blue-600 rounded-full w-32 h-10">
            Manage Users
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={(inputValue, textareaValue) => {
            /* handle save */
          }}
        />
      </div>
    </div>
  );
}
