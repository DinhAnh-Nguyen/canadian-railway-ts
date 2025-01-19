import React from 'react';
import fetchTasks from '../app/schedule/page';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: number;
    description: string;
    status: string;
    assigned_to: string;
    date: string;
    priority: string;
  };
}


export default function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
  if (!isOpen) {
    return null;
  }
  const deleteTask = async () => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      // Task deleted successfully Refresh the page
      fetchTasks();
    }
    
    onClose();
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg w-1/3">
        <h2 className="font-medium text-center text-xl text-white">Task Details</h2>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <p className="mt-1 text-white">{task.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <p className="mt-1 text-white">{task.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Assigned To</label>
            <p className="mt-1 text-white">{task.assigned_to}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Due Date</label>
            <p className="mt-1 text-white">{task.date}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Priority</label>
            <p className="mt-1 text-white">{task.priority}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={deleteTask}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}