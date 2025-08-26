import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";npm run dev

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Learn React", completed: false, isEditing: false },
    { id: 2, name: "Build a To-Do App", completed: false, isEditing: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const updateTask = (id, newName) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: newName, isEditing: false } : task
      )
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">✅ To-Do App</h1>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          >
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.name}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTask(task.id, e.target.value);
                  }
                }}
                className="flex-1 p-1 border rounded"
              />
            ) : (
              <span
                onClick={() => toggleTask(task.id)}
                className={`flex-1 cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.name}
              </span>
            )}

            <div className="flex gap-2 ml-2">
              <button
                onClick={() => startEditing(task.id)}
                className="text-blue-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
