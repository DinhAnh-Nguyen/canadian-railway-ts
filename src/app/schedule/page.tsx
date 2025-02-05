"use client";
import Modal from "@/components/modal";
import moment from "moment";
import Nav from "@/components/navbar";
import React, { useState, FormEvent, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskDetailsModal from "@/components/detailsModal";

// Initialize the localizer with moment
const localizer = momentLocalizer(moment);

type task = {
  id: number;
  title: string;
  description: string;
  status: string;
  assigned_to: number;
  created_by: string;
  due_date: string;
  priority: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
};

export default function Schedule() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for task details modal
  const [selectedTask, setSelectedTask] = useState<task | null>(null); // State to store the selected task
  const [selectedRange, setSelectedRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      console.log(fetchedTasks);
      setTasks(fetchedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  // Fetch all tasks
  const getTasks = async (): Promise<task[]> => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  // Handle adding a new task
  const handleAddTask = async (
    title: string,
    description: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    assignedTo: number,
    priority: string,
    status: string
  ) => {
    // Combine date and time into a single due_date string
    const due_date = `${endDate}T${endTime}:00`;

    // Create a new task object
    const newTask = {
      title: title,
      description: description,
      status: status, // Include the status
      assigned_to: assignedTo.toString(),
      created_by: "Admin", // Replace with the actual creator
      due_date: due_date,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      priority: priority,
    };

    // Send the task to the API
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    // Add the task to the state with the database-generated ID
    const createdTask = await response.json();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...createdTask,
        start: new Date(
          createdTask.start_date
        ),
        end: new Date(createdTask.end_date),
      },
    ]);

    setIsModalOpen(false);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      // Delete the task from the API
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the task from the state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setIsDetailsModalOpen(false); // Close the details modal
      } else {
        console.error("Failed to delete task:", response.statusText);
        console.log("Error deleting task:", taskId);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task click on the calendar
  const handleSelectEvent = (task: any) => {
    setSelectedTask(task); // Set the selected task
    setIsDetailsModalOpen(true); // Open the task details modal
  };

  // Handle date selection for new task
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setIsModalOpen(true);
    setSelectedRange({ start, end });
  };

  // Transform tasks for the calendar
  const calendarTasks = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.start_date), // Use start date and time
    end: new Date(task.end_date), // Use end date and time
    description: task.description,
    assigned_to: task.assigned_to,
    status: task.status,
    priority: task.priority, // Include priority in the event object
    due_date: task.due_date
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  } else {
    return (
      <div>
        <Nav />
        <div className="flex justify-end">
          <div className="flex px-4">
            <button
              className="bg-blue-600 w-32 h-10 rounded-full cursor-pointer hover:bg-blue-500"
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
              onDelete={handleDeleteTask}
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
          <h1 className="text-2xl font-bold mb-4 text-white">
            Scheduled Tasks
          </h1>
          <table className="border-collapse border border-gray-800 w-full justify-items-center">
            <thead>
              <tr>
                <th className="border border-gray-800">Order ID</th>
                <th className="border border-gray-800">Status</th>
                <th className="border border-gray-800">Title</th>
                <th className="border border-gray-800">Description</th>
                <th className="border border-gray-800">Start Date</th>
                <th className="border border-gray-800">Start Time</th>
                <th className="border border-gray-800">End Date</th>
                <th className="border border-gray-800">End Time</th>
                <th className="border border-gray-800">Assigned To</th>
                <th className="border border-gray-800">Priority</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border border-gray-300">#{task.id}</td>
                  <td className="border border-gray-300">{task.status}</td>
                  <td className="border border-gray-300">{task.title}</td>
                  <td className="border border-gray-300">{task.description}</td>
                  <td className="border border-gray-300">{task.start_date}</td>
                  <td className="border border-gray-300">{task.start_time}</td>
                  <td className="border border-gray-300">{task.end_date}</td>
                  <td className="border border-gray-300">{task.end_time}</td>
                  <td className="border border-gray-300">{task.assigned_to}</td>
                  <td className="border border-gray-300">{task.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
