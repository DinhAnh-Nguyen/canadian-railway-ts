"use client";
import React from 'react'
import { useEffect, useState } from 'react'

export default function page() {
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState({});
const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

const getUsers = async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
};

const updateUser = async (e) => {
  e.preventDefault();
  // Send a PUT request to update the user
  await fetch(`/api/users/${selectedUser?.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedUser),
    });
    const users = await getUsers();
    setUsers(users);
};

const addUser = async (e) => {
  e.preventDefault();
  // Send a POST request to add a new user
  await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...newUser, role:"user"}),
  });
  const users = await getUsers();
  setUsers(users);
  setNewUser({ name: '', email: '', role: '' });
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
      
    </div>
  )
}
