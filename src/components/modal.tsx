import React, { useState } from 'react'


interface ModalProps {
    isOpen: boolean;
    onSave: (inputValue: string, textareaValue: string) => void;
    onClose: () => void;
}

export default function Modal({isOpen, onSave, onClose}: ModalProps) {
    if (!isOpen) {
        return null;
    }
    const [inputValue, setInputValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue || !textareaValue) {
            setError("Please fill in all fields");
            return;
        }
        setError("");
        onSave(inputValue, textareaValue);
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 bg-gray-800 p-8 rounded-lg">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="font-medium text-center text-xl text-white">
            Write Review
          </h2>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="title"
                    name="username"
                    type="text"
                    placeholder="Add a title"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-800 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={4}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-800 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="Write your review here"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              
              className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
