"use client";
import Modal from "@/components/modal";
import moment from "moment";
import React, { useState, FormEvent, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskDetailsModal from "@/components/detailsModal";

// Initialize the localizer with moment
const localizer = momentLocalizer(moment);

type task = {
  id: number;
  description: string;
  status: string;
  assigned_to: string;
  created_by: string;
  due_date: string;
  priority: string;
  start: Date;
  end: Date;
};

export default function Schedule() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for task details modal
  const [selectedTask, setSelectedTask] = useState<task | null>(null); // State to store the selected task

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  // Delete a task
  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    console.log(`Task with ID ${id} deleted successfully.`);
  };

  // Fetch all tasks
  const getTasks = async (): Promise<task[]> => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return data;
  };

  // Handle adding a new task
  const handleAddTask = async (
    title: string,
    description: string,
    date: string,
    time: string,
    assignedTo: number,
    priority: string,
    status: string
  ) => {
    // Combine date and time into a single due_date string
    const due_date = `${date}T${time}:00`;

    // Create a new task object
    const newTask = {
      id: tasks.length + 1, // Generate a unique ID (replace with a better method if needed)
      description: title,
      status: status, // Include the status
      assigned_to: assignedTo.toString(),
      created_by: "Admin", // Replace with the actual creator
      due_date,
      priority: priority, // Include the priority
      start: new Date(due_date), // Set start date
      end: new Date(due_date), // Set end date
    };

    // Add the task to the state
    setTasks([...tasks, newTask]);

    // Send the task to the API
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    // Close the modal
    setIsModalOpen(false);
  };

  // Handle task click on the calendar
  const handleSelectEvent = (task: any) => {
    setSelectedTask(task); // Set the selected task
    setIsDetailsModalOpen(true); // Open the task details modal
  };

  // Handle date selection for new task
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setIsModalOpen(true);
  };

  // Transform tasks for the calendar
  const calendarTasks = tasks.map((task) => ({
    id: task.id,
    title: task.description, // Use description as the title
    start: new Date(task.due_date), // Convert due_date to a Date object
    end: new Date(task.due_date), // Use the same date for end (or adjust as needed)
    description: task.description,
    assigned_to: task.assigned_to,
    status: task.status,
    priority: task.priority, // Include priority in the event object
  }));

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex px-4">
          <button
            className="bg-blue-600 w-32 h-10 rounded-full cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Schedule
          </button>
        </div>

        <div className="flex px-4">
          <button className="bg-blue-600 rounded-full w-32 h-10">
            Manage Users
          </button>
        </div>

        {/* Modal for adding a task */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />

        {/* Modal for task details */}
        {selectedTask && (
          <TaskDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            task={selectedTask}
          />
        )}
      </div>

      {/* Calendar Component */}
      <div className="mt-8 h-[600px]">
        <Calendar
          localizer={localizer}
          events={calendarTasks}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          defaultView="month"
          views={["month", "week", "day"]}
        />
      </div>

      {/* Task Table */}
      <div className="mt-8">
        <h1 className="text-lg font-bold">Scheduled Tasks</h1>
        <table className="border-collapse border border-gray-800 w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Description</th>
              <th>Date</th>
              <th>Assigned To</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>#{task.id}</td>
                <td>{task.status}</td> 
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>{task.assigned_to}</td>
                <td>{task.priority}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}