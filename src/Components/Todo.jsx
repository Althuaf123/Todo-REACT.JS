import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
// import { FiEdit } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== '') {
        setTodos([...todos, { list:todo, id:Date.now(), status:false }]);
    setTodo("");
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
   setTodos(todos.filter((to) => to.id !== id))
  }

  const onComplete = (id) => {
    let complete = todos.map((list) => {
        if(list.id === id){
            return({...list, status : !list.status})
        }
        return list
    })
    setTodos(complete)
  }

//   const onEdit = (id) => {
//     const editTodo = todos.find((to) => to.id === id )
//     setTodo(editTodo.list)
//   }

  return (
    <div className="container">
      <h2>Todo List</h2>
      <form className="form-group" onSubmit={handleSubmit} action="">
        <input
          className="form-control"
          type="text"
          placeholder="Enter your todo"
          ref={inputRef}
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id= { to.status ? 'list-item' : '' }>{to.list}</div>
              <span>
                <BiLike
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                {/* <FiEdit className="list-item-icons" id="edit" title="Edit" onClick={() => onEdit(to.id)}/> */}
                <IoCloseCircleOutline
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
