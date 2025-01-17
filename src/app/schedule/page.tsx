"use client";
import Modal from "@/components/modal";
import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  assignedTo: string;
};

export default function Schedule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([] as Task[]);

  // Delete a task
  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const updatedTasks = tasks.filter((task) => task.id !== id); // Remove the task from the state
    setTasks(updatedTasks);
    console.log(`Task with ID ${id} deleted successfully.`);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

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
      <div className="flex justify-end">
        <div className="flex px-4">
          <button
            className="bg-blue-600 w-32 h-10 rounded-full cursor-pointer"
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

      <div className="mt-8">
        <h1 className="text-lg font-bold">Scheduled Tasks</h1>
        <table className="border-collapse border border-gray-800 w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Assigned To</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.date}</td>
                <td>{task.assignedTo}</td>
                <td>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
