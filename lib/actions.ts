import { connectDB } from "./mongodb"; // Ensure consistent import
import Task from "../models/task";
import { revalidatePath } from "next/cache"; // Needed for Server Actions

// ✅ Fetch all tasks from MongoDB
export async function getTasks() {
  try {
    await connectDB();
    const tasks = await Task.find({});

    return tasks.map((task) => ({
      _id: task._id.toString(), // Convert ObjectId to string
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.toISOString(), // Convert date to string
      completed: task.completed,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

// ✅ Add a new task to MongoDB
export async function addTask(title: string, description: string, dueDate: string) {
  try {
    await connectDB();
    const newTask = new Task({ title, description, dueDate, completed: false });
    await newTask.save();
    
    revalidatePath("/"); // Refresh the UI after adding a task

    return {
      _id: newTask._id.toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate.toISOString(),
      completed: newTask.completed,
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
}

// ✅ Toggle Task Completion
export async function toggleTask(taskId: string, completed: boolean) {
  try {
    await connectDB();
    await Task.findByIdAndUpdate(taskId, { completed });

    revalidatePath("/"); // Refresh UI after task update
  } catch (error) {
    console.error("Error toggling task:", error);
    throw new Error("Failed to update task status");
  }
}

// ✅ Delete a Task
export async function deleteTask(taskId: string) {
  try {
    await connectDB();
    await Task.findByIdAndDelete(taskId);

    revalidatePath("/"); // Refresh UI after deletion
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
}
