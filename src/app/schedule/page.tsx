"use client";
import Modal from "@/components/modal";
import React, { useState, FormEvent, useEffect } from "react";


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
                <td>{task.status}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>{task.assigned_to}</td>
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
