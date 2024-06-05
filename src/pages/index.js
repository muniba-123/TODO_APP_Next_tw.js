import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TodoList from "@/components/Todolist";
import "../../styles/globals.css";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAdd = () => {
    router.push("/add");
  };

  const handleEdit = (todo) => {
    router.push(`/edit?id=${todo.id}`);
  };

  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  const handleComplete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    }).then(() => {
      setTodos(
        todos?.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">TODO List</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Add TODO
      </button>
      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default Home;
