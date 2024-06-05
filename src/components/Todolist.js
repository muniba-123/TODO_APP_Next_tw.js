import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onEdit, onDelete, onComplete }) => (
  <div>
    {todos?.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onEdit={onEdit}
        onDelete={onDelete}
        onComplete={onComplete}
      />
    ))}
  </div>
);

export default TodoList;
