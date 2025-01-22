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
  assigned_to: string;
  created_by: string;
  due_date: string;
  priority: string;
  date: string;
};

export default function Schedule() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for task details modal
  const [selectedTask, setSelectedTask] = useState<task | null>(null); // State to store the selected task
  // const hardcodedTasks = [
  //   {
  //     id: 1,
  //     title: "Task 1",
  //     description: "Description 1",
  //     status: "Pending",
  //     assigned_to: "1",
  //     created_by: "1",
  //     due_date: "2025-01-20T18:12:00Z",
  //     priority: "High",
  //     date: "2025-01-20", // Add the date property
  //   },
  //   {
  //     id: 2,
  //     title: "Task 2",
  //     description: "Description 2",
  //     status: "Completed",
  //     assigned_to: "2",
  //     created_by: "2",
  //     due_date: "2025-01-21T07:12:00Z",
  //     priority: "Medium",
      
  //     date: "2025-01-20", // Add the date property
  //   },
  //   {
  //     id: 3,
  //     title: "Task 2",
  //     description: "Description 2",
  //     status: "Completed",
  //     assigned_to: "2",
  //     created_by: "2",
  //     due_date: "2025-01-21T07:12:00Z",
  //     priority: "Medium",
  //     date: "2025-01-21", // Add the date property
  //   },
  // ];

  // useEffect(() => {
  //   setTasks(hardcodedTasks);
  // }, []);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      console.log(fetchedTasks);
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

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
      title: title,
      description: description,
      status: status, // Include the status
      assigned_to: assignedTo.toString(),
      created_by: "Admin", // Replace with the actual creator
      due_date: due_date,
      date: date, // Assign date property
      priority: priority, // Include priority property
    };

    // Send the task to the API
   const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const createdTask = await response.json();

    // Add the task to the state with the database-generated ID
  setTasks((prevTasks) => [
    ...prevTasks,
    {
      ...createdTask,
      start: new Date(createdTask.due_date), // Set start date
      end: new Date(createdTask.due_date), // Set end date
      date: date, // Assign date property
    },
  ]);
 
    // Close the modal
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
  };

  // Transform tasks for the calendar
  const calendarTasks = tasks.map((task) => ({
    id: task.id,
    title: task.title, 
    start: new Date(task.due_date), // Convert due_date to a Date object
    end: new Date(task.due_date), // Use the same date for end (or adjust as needed)
    description: task.description,
    assigned_to: task.assigned_to,
    status: task.status,
    priority: task.priority, // Include priority in the event object
  }));
  
 
  

  return (
    <div>
      <Nav />
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
        <h1 className="text-lg font-bold">Scheduled Tasks</h1>
        <table className="border-collapse border border-gray-800 w-full justify-items-center">
          <thead>
            <tr>
              <th className="border border-gray-800">Order ID</th>
              <th className="border border-gray-800">Status</th>
              <th className="border border-gray-800">Title</th>
              <th className="border border-gray-800">Description</th>
              <th className="border border-gray-800">Date</th>
              <th className="border border-gray-800">Assigned To</th>
              <th className="border border-gray-800">Priority</th>
              <th className="border border-gray-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border border-gray-300">#{task.id}</td>
                <td className="border border-gray-300">{task.status}</td>
                <td className="border border-gray-300">{task.title}</td>
                <td className="border border-gray-300">{task.description}</td>
                <td className="border border-gray-300">{task.due_date}</td>
                <td className="border border-gray-300">{task.assigned_to}</td>
                <td className="border border-gray-300">{task.priority}</td>
                <td className="border border-gray-300">{task.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}