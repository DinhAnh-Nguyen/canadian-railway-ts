"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import Nav from "@/components/navbar";
import Link from "next/link";
import dynamic from "next/dynamic";
import useForecast from "../hooks/useForecast";
import { useRouter } from "next/navigation";
import TrackCapacityChart from "@/components/trackOverViewComponents/TrackCapacityChart";
import { CHART_OPTIONS } from "@/data/chartConfig";
import { trackCapacityData } from "@/data/trackData";
import AIchatbot from "@/components/AIchatbot";
import ProtectedRoute from "@/components/ProtectedRoute";
import WeatherWidget from "@/components/weather/WeatherWidget";


export default function Dashboard() {
  type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    assigned_to: string;
    created_by: string;
    due_date: string;
    priority: string;
    date: string;
    track_id: number;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const { forecastData } = useForecast();
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Initialize Google Maps
  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error("Google Maps API key is missing.");
      return;
    }

    const loader = new Loader({
      apiKey: googleMapsApiKey,
    });

    loader.load().then(() => {
      if (mapRef.current) {
        new google.maps.Map(mapRef.current, {
          center: { lat: 51.0447, lng: -114.0719 }, // Calgary, Alberta
          zoom: 13,
        });
      }
    });
  }, [googleMapsApiKey]);

  // Fetch tasks from the API
  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid tasks data format");
      }

      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  // Dynamically import the CombinedMap component
  const CombinedMap = dynamic(
    () => import("@/components/trackOverViewComponents/CombinedMap"),
    { ssr: false }
  );

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const forecast = forecastData["Banff"];

  return (
    // <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="flex">
        <Nav />
        <div className="px-6 bg-background text-foreground w-full h-screen flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6 h-full">
            <div
              className="lg:col-span-1 lg:row-span-1 flex flex-col space-y-3 h-full rounded-md p-2 bg-[#393A3E] flex-grow hover:cursor-pointer items-center justify-center overflow-hidden"
              onClick={() => router.push("/weather")}
            >
              <h3 className="text-center text-lg font-bold">
                Weather Overview
              </h3>
              <h3>Banff</h3>
              <p>Wind: {forecast?.list[0].wind.speed ?? "-"} km/h</p>
              <p>Temperature: {forecast?.list[0].main.temp ?? "-"}°C</p>
              <p>Humidity: {forecast?.list[0].main.humidity ?? "-"}%</p>
              <WeatherWidget />
            </div>
            <div
              className="lg:col-span-1 lg:row-span-1 flex flex-col space-y-3 h-full rounded-md pb-12 pt-2 pr-2 pl-2 bg-[#393A3E] flex-grow hover:cursor-pointer"
              onClick={() => router.push("/trackOverview")}
            >
              <TrackCapacityChart
                data={trackCapacityData}
                options={CHART_OPTIONS}
              />
            </div>
            <div
              className="lg:col-span-1 lg:row-span-1 flex flex-col space-y-3 h-full rounded-md p-2 bg-[#393A3E] flex-grow hover:cursor-pointer"
              onClick={() => router.push("/schedule")}
            >
              <h3 className="text-center text-lg font-bold">Schedules</h3>{" "}
              <table className="border-collapse border border-gray-800 w-full">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Track</th>
                    <th>Date</th>
                    <th>Assigned To</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.track_id}</td>
                      <td>{task.due_date}</td>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                        >
                          Delete
                        </button>
                        <button>
                          <Link
                            href={`/task/${task.id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Edit
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="lg:col-span-1 lg:row-span-1 flex flex-col space-y-3 h-full rounded-md bg-[#393A3E] hover:cursor-pointer z-0"
              onClick={() => router.push("/trackOverview")}
            >
              <CombinedMap selectedTrack="defaultTrack" />
            </div>
          </div>
        </div>
        <AIchatbot />
      </div>
    // </ProtectedRoute>
  );
}
