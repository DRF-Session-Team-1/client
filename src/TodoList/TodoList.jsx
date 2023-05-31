import './TodoList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

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

  const handleEditClick = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleCancelClick = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const handleSaveClick = () => {
    updateTodo(editingTodoId, editingTodoText);
  };

  return (
    <div className='main'>
      <h1>Todo List</h1>
      <div className='container'>
        <div className='input-container'>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingTodoId === todo.id ? (
                <div className="todo-content">
                  <div className='text-container'>
                    <input
                      type="text"
                      value={editingTodoText}
                      onChange={(e) => setEditingTodoText(e.target.value)}
                    />
                  </div>
                  <div className="button-container">
                    <button onClick={handleSaveClick}>Submit</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="todo-content">
                  <div className='text-container'>
                    {todo.text}
                  </div>
                  <div className="button-container">
                    <button onClick={() => handleEditClick(todo.id, todo.text)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
