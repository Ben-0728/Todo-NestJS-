import { useState, useEffect } from "react"
import axios from "axios"

export const useTodos = () => { 
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get("http://localhost:3000/todo/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setTodos(res.data)
        setLoading(false)
    }
    fetchTodos()
  }, [])

  return {todos, loading}
}