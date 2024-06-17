import React, { useEffect, useState } from 'react';
import Todo from '../components/Todo';
import { useTodos } from '../hooks/Todos';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Todos = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { todos, loading } = useTodos();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to be logged in to access this page")
            navigate("/signin");
        }
    },[])

  const addTodo = async () => {
    try{await axios.post("http://localhost:3000/todo/create", {
        title,
        content
        }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        }).then(() => {
        setTitle("");
        setContent("");
        alert("Todo added successfully");
        window.location.reload();
    })
}catch(e){
    console.log(e);
    alert("Error adding todo");
  };
  }
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex flex-col mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-t-lg focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="p-2 border border-gray-300 rounded-b-lg focus:outline-none mt-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="4"
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div>
      {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          todos.map((todo, index) => (
            <Todo key={index} title={todo.title} content={todo.content} completed={todo.completed} id={todo.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Todos;