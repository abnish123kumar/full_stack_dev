import React from "react"; // ✅ Ensure React is imported
// import { ITask } from "../lib/models/task"; // Adjust this path based on your folder structure
// import { toggleTask, deleteTask } from "../lib/actions";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function TaskItem({ task, onUpdate, onDelete }: { task: Task; onUpdate: () => void; onDelete: () => void }) {
  return (
    <div className="p-4 border rounded mb-2 flex justify-between items-center bg-white text-black shadow-md">
      <div>
        <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onUpdate} className="bg-green-500 text-white px-2 py-1 rounded">
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}

