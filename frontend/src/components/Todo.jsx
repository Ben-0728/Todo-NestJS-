import axios from 'axios';
import React from 'react';

const Todo = ({ title, content, completed, id }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-2">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{content}</p>
        <div className="flex justify-between items-center mt-4">
            <button disabled={completed==true} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={async() => {
                try{
                    await axios.post("http://localhost:3000/todo/complete", {
                        id
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }).then(() => {
                        alert("Todo completed successfully");
                        window.location.reload();
                    })
                }catch(e){
                    console.log(e);
                    alert("Error completing todo");
                }
            }}>
            {completed ? "Completed" : "Mark as completed"}
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={async() => {
                try{
                    await axios.post("http://localhost:3000/todo/delete", {
                        id
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }).then(() => {
                        alert("Todo deleted successfully");
                        window.location.reload();
                    })
                }catch(e){
                    console.log(e);
                    alert("Error deleting todo");
                }
            }}>Delete</button>
            </div>
    </div>
  );
};

export default Todo;