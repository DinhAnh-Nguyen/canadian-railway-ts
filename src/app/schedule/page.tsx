"use client";

import { useState, useEffect, useMemo } from "react";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";

import Modal from "@/components/modal";
import TaskDetailsModal from "@/components/detailsModal";
import Nav from "@/components/navbar";

// Task Type Definition
 export type Task = {
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
  track_id: number;
};

export default function Schedule() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const eventsService = useState(() => createEventsServicePlugin())[0];

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  // Fetch all tasks
  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();

      // Format dates to match the calendar's expected format
      const formattedTasks = data.map((task: Task) => ({
        ...task,
        start_date: task.start_date.split("T")[0], // Extract YYYY-MM-DD
        end_date: task.end_date.split("T")[0], // Extract YYYY-MM-DD
      }));

      console.log("Formatted tasks:", formattedTasks); // Debugging
      return formattedTasks;
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
    status: string,
    trackID: number
  ) => {
    const due_date = `${endDate}T${endTime}:00`;

    const newTask = {
      title,
      description,
      status,
      assigned_to: assignedTo,
      created_by: "Admin",
      due_date,
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      priority,
      track_Id: trackID
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const createdTask = await response.json();

      // Format the dates to match the calendar's expected format
      const formattedTask = {
        ...createdTask,
        start_date: createdTask.start_date.split("T")[0], // Extract YYYY-MM-DD
        end_date: createdTask.end_date.split("T")[0], // Extract YYYY-MM-DD
      };

      // Update the tasks state
      setTasks((prevTasks) => [...prevTasks, formattedTask]);

      // Update the events array for the calendar
      const newEvent = {
        id: formattedTask.id.toString(),
        title: formattedTask.title,
        start: formattedTask.start_date,
        end: formattedTask.end_date,
      };
      eventsService.add(newEvent); // Add the new event to the calendar

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setIsDetailsModalOpen(false);
      } else {
        console.error("Failed to delete task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Transform tasks for Schedule-X format
  const events = useMemo(() => {
    return tasks.map((task) => ({
      id: task.id.toString(),
      title: task.title,
      start: task.start_date, // Already formatted as YYYY-MM-DD
      end: task.end_date, // Already formatted as YYYY-MM-DD
    }));
  }, [tasks]);

  const calendar = useNextCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    defaultView: "week",
    events,
    plugins: [eventsService],
    callbacks: {
      onRender: () => eventsService.getAll(),
      onEventClick: (event) => {
        const foundTask = tasks.find((task) => task.id.toString() === event.id);
        if (foundTask) {
          setSelectedTask(foundTask);
          setIsDetailsModalOpen(true);
        }
      },
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  } else {
    return (
      <div className="flex" >
        <Nav />
        <div className="flex justify-end p-4">
          <button
            className="bg-blue-600 w-32 h-10 rounded-full cursor-pointer hover:bg-blue-500"
            onClick={() => setIsModalOpen(true)}
          >
            Schedule
          </button>
        </div>

        {/* Modal for adding a task */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} />

        {/* Modal for task details */}
        {selectedTask && (
          <TaskDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            task={selectedTask}
            onDelete={handleDeleteTask}
          />
        )}
        <div className=" text-white min-h-screen p-6 w-full max-h-12"> 
        {/* Schedule-X Calendar */}
        <div className="sx-react-calendar-wrapper w-full h-[600px] mt-4">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>

        {/* Task Table */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4 text-white">Scheduled Tasks</h1>
          <table className="border-collapse border border-gray-800 w-full ">
            <thead>
              <tr>
                <th className="border border-gray-800">Order ID</th>
                <th className="border border-gray-800">Track ID</th>
                <th className="border border-gray-800">Status</th>
                <th className="border border-gray-800">Title</th>
                <th className="border border-gray-800">Description</th>
                <th className="border border-gray-800">Start Date</th>
                <th className="border border-gray-800">End Date</th>
                <th className="border border-gray-800">Assigned To</th>
                <th className="border border-gray-800">Priority</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border border-gray-300">#{task.id}</td>
                  <td className="border border-gray-300">#{task.track_id}</td>
                  <td className="border border-gray-300">{task.status}</td>
                  <td className="border border-gray-300">{task.title}</td>
                  <td className="border border-gray-300">{task.description}</td>
                  <td className="border border-gray-300">{task.start_date}</td>
                  <td className="border border-gray-300">{task.end_date}</td>
                  <td className="border border-gray-300">{task.assigned_to}</td>
                  <td className="border border-gray-300">{task.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}