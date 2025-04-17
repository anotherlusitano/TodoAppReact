import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TodoItem(props) {
  return (
    <div key={props.id} className="todo-item">
      <div>
        <input
          type="checkbox"
          value={props.id}
          onChange={props.markAsDone}
          checked={props.done}
        />
        <span>{props.title}</span>
      </div>
      <button className="delete-todo-btn" onClick={props.deleteTodo}>
        <AiOutlineClose size={20} alignmentBaseline="middle" />
      </button>
    </div>
  );
}
