"use client";
import React from "react";
import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate }),
      });

      if (res.ok) {
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
        setDueDate("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (id: string, completed: boolean) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed }),
      });

      if (res.ok) {
        const updatedTask = await res.json();
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Task Manager</h1>
      <form onSubmit={handleAddTask} className="mb-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="border p-2 w-full mb-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full mb-2" />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Task</button>
      </form>

      {tasks.length > 0 ? tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={() => handleUpdateTask(task._id, !task.completed)} onDelete={() => handleDeleteTask(task._id)} />
      )) : <p>No tasks available</p>}
    </main>
  );
}
