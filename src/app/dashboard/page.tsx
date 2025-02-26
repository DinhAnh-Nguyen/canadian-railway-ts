"use client";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Nav from "@/components/navbar";
import Link from "next/link";
import CombinedMap from "@/components/trackOverViewComponents/CombinedMap";
import useForecast from "../hooks/useForecast";
import { useRouter } from "next/navigation";

export default function Dashboard() {
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

  const [tasks, setTasks] = useState<task[]>([]);
  // const [loading, setLoading] = useState(true);
  const { forecastData } = useForecast();
  const router = useRouter();

  // Reference for the map container
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Retrieve the API key from the environment variable
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey || "", // Use API key from the .env.local file
    });

    loader.load().then(() => {
      if (mapRef.current) {
        new google.maps.Map(mapRef.current, {
          center: { lat: 51.0447, lng: -114.0719 }, // get the location for Calgary, Alberta
          zoom: 13,
        });
      }
    });
  }, [googleMapsApiKey]);

  //Fetch all tasks - Chris
  const getTasks = async (): Promise<task[]> => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return data;
  };

  const handleDeleteTask = async (taskId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  // Mock Data for Track Capacity (Line Chart)
  const trackCapacityData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Track 1",
        data: [200, 220, 210, 250, 240, 230, 260, 300, 320, 350, 370, 400],
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Track 2",
        data: [170, 190, 220, 230, 250, 240, 250, 260, 270, 320, 330, 370],
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      },
      {
        label: "Track 3",
        data: [130, 170, 180, 200, 210, 180, 190, 220, 270, 300, 320, 340],
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
      },
      {
        label: "Track 4",
        data: [150, 150, 160, 180, 190, 200, 220, 230, 250, 270, 290, 310],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Track 5",
        data: [150, 145, 150, 160, 170, 190, 210, 230, 240, 260, 280, 300],
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const forecast = forecastData["Banff"];

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="flex">
      <Nav />
      <div className="px-6 bg-background text-foreground w-full">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-6 rounded-md p-2 bg-[#393A3E] h-80 hover:cursor-pointer" onClick={() => router.push("/weather")}>
              <h3 className="text-center text-lg font-bold mb-4">Weather Overview</h3>
              <h3>Banff</h3>
              <p>Wind: {forecast?.list[0].wind.speed ?? "-"} km/h</p>
              <p>Temperature: {forecast?.list[0].main.temp ?? "-"}°C</p>
              <p>Humidity: {forecast?.list[0].main.humidity ?? "-"}%</p>
            </div>
            <div className="space-y-6 rounded-md p-2 bg-[#393A3E] h-80 hover:cursor-pointer" onClick={() => router.push("/schedule")}>
              <h3 className="text-center text-lg font-bold">Schedules</h3>
              <h3
                className="text-center text-sm font-bold"
                style={{ marginTop: 1 }}
              >
                Wednesday
              </h3>
              <table className="border-collapse border border-gray-800 w-full">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Assigned To</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.due_date}</td>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDeleteTask(task.id)}
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
          </div>
          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-6 rounded-md p-2 bg-[#393A3E] h-80 hover:cursor-pointer" onClick={() => router.push("/trackOverview")}>
              <h3 className="text-center text-lg font-bold mb-4">
                Track Capacity
              </h3>
              <Line data={trackCapacityData} options={chartOptions} />
            </div>
            <div className="space-y-6 rounded-md p-2 bg-[#393A3E] h-80 hover:cursor-pointer" onClick={() => router.push("/trackOverview")}>
              <CombinedMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
