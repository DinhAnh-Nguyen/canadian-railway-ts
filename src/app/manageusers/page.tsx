"use client";
import React from "react";
import { useEffect, useState, FormEvent } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function page() {
  const [users, setUsers] = useState([] as User[]);
  const [selectedUser, setSelectedUser] = useState({} as User);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  // Fetch all users
  const getUsers = async (): Promise<User[]> => {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  };

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send a PUT request to update the user
    await fetch(`/api/users/${selectedUser?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedUser),
    });
    const users = await getUsers();
    setUsers(users);
  };

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send a POST request to add a new user
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser, role: "user" }),
    });
    const users = await getUsers();
    setUsers(users);
    setNewUser({ name: "", email: "", role: "" });
  };

  //Delete a user
  const deleteUser = async (id: number) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    setSelectedUser({} as User);
    const users = await getUsers();
    setUsers(users);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      <div>
        <input
          type="text"
          className="border border-gray-800 text-black"
          placeholder="Search by name"
          onChange={(e) => {
            const query = e.target.value.toLowerCase();
            if (query) {
              const filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(query)
              );
              setUsers(filteredUsers);
            } else {
              getUsers().then(setUsers);
            }
          }}
        />
      </div>
      <table className="border-collapse border border-gray-800 w-full">
        <thead>
          <tr className="">
            <th className="border border-gray-800 p-2">Name</th>
            <th className="border border-gray-800 p-2">ID</th>
            <th className="border border-gray-800 p-2">Email</th>
            <th className="border border-gray-800 p-2">Role</th>
            <th className="border border-gray-800 p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-600">
              <td className="border border-gray-700 p-2 text-center">{user.name}</td>
              <td className="border border-gray-700 p-2 text-center">{user.id}</td>
              <td className="border border-gray-700 p-2 text-center">{user.email}</td>
              <td className="border border-gray-700 p-2 text-center">{user.role}</td>
              <td className="border border-gray-700 p-2 text-center">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          className="border border-gray-800 text-black"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          className="border border-gray-800 text-black"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          className="border border-gray-800 text-black"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          type="submit"
        >
          Add User
        </button>
      </form>

      <div className={selectedUser.id ? "" : "invisible"}>
        <h2>Edit User</h2>
        <form onSubmit={updateUser}>
          <input
            type="text"
            className="border border-gray-800 text-black"
            placeholder="Name"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <input
            type="email"
            className="border border-gray-800 text-black"
            placeholder="Email"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-800 text-black"
            placeholder="Role"
            value={selectedUser.role}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            type="submit"
          >
            Update User
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => setSelectedUser({} as User)}
          >
            Cancel
          </button>
        </form>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => deleteUser(selectedUser.id)}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
