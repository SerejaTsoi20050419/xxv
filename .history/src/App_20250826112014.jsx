import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Купить хлеб", completed: false },
    { id: 2, text: "Выучить React", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEdit(task.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 p-2 rounded">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-1 rounded"
            autoFocus
          />
        ) : (
          <span
            className={task.completed ? "line-through text-gray-500" : ""}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setIsEditing(!isEditing)}>
          <FaEdit />
        </button>
        <button onClick={() => onDelete(task.id)}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default App;