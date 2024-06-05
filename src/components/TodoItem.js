import React from "react";

const TodoItem = ({ todo, onEdit, onDelete, onComplete }) => (
  <div className="flex justify-between items-center p-4 bg-white shadow-md my-2">
    <div>
      <h3 className={`text-lg ${todo.completed ? "line-through" : ""}`}>
        {todo.title}
      </h3>
      <p className={`text-sm ${todo.completed ? "line-through" : ""}`}>
        {todo.description}
      </p>
    </div>
    <div className="flex space-x-2">
      {!todo.completed && (
        <button onClick={() => onComplete(todo.id)} className="text-green-500">
          Complete
        </button>
      )}
      <button onClick={() => onEdit(todo)} className="text-blue-500">
        Edit
      </button>
      <button onClick={() => onDelete(todo.id)} className="text-red-500">
        Delete
      </button>
    </div>
  </div>
);

export default TodoItem;
