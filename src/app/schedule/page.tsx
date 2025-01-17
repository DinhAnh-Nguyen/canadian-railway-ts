"use client";
import Modal from "@/components/modal";
import React, { useState, FormEvent } from "react";

type task = {
  id: number;
  description: string;
  status: string;
  assigned_to: string;
  created_by: string;
  due_date: string;
  piroty: string;
}
export default function Schedule() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [newTask, setNewTask] = useState<task>({ id: 0, description: "", status: "", assigned_to: "", created_by: "", due_date: "", piroty: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };
  //Will fetch all tasks
  const getTasks = async (): Promise<task[]> => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return data;
  }

  //Will add a task
  const addTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send a POST request to add a new task
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newTask,
      }),
    });
    const tasks = await getTasks();
    setTasks(tasks);
    setNewTask({ id: 0, description: "", status: "", assigned_to: "", created_by: "", due_date: "", piroty: "" });
  }

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
