import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/todos/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Edit TODO</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
