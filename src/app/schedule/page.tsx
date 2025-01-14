import React, { useState } from "react";

export default function Schedule() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSchedule = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    }
  return (
    <div>
      <div className="flex justify-end ">
        <div className="flex px-4 ">
          <button className="bg-blue-600 w-32 h-10 rounded-full ">Schedule</button>
        </div>
        <div className="flex px-4">
          <button className="bg-blue-600 rounded-full w-32 h-10">Manage Users</button>
        </div>
      </div>
    </div>
  );
}
