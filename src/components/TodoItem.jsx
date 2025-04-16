import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TodoItem(props) {
  return (
    <div key={props.id} className="todo-item">
      <span>{props.title}</span>
      <button className="delete-todo-btn" onClick={props.deleteTodo}>
        <AiOutlineClose size={20} alignmentBaseline="middle" />
      </button>
    </div>
  );
}
