import './TodoList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/to-do/');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/to-do/', { text: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/to-do/${id}/`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/to-do/${id}/`, { text: newText });
      fetchTodos();
      setEditingTodoId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => updateTodo(todo.id, e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {editingTodoId === todo.id ? (
              <button onClick={() => setEditingTodoId(null)}>Cancel</button>
            ) : (
              <button onClick={() => setEditingTodoId(todo.id)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
