import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb"; // ✅ Corrected Import Path
import Task from "../../../models/task"; // ✅ Corrected Import Path

// GET all tasks
export async function GET() {
  await connectDB();
  const tasks = await Task.find({});
  return NextResponse.json(tasks);
}

// POST a new task
export async function POST(req: Request) {
  await connectDB();
  const { title, description, dueDate } = await req.json();
  const newTask = await Task.create({ title, description, dueDate });
  return NextResponse.json(newTask, { status: 201 });
}

// PATCH (update task)
export async function PATCH(req: Request) {
  await connectDB();
  const { id, completed } = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  return NextResponse.json(updatedTask);
}

// DELETE a task
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}
