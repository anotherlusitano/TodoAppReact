import React from "react";

export default function TodoItem(props) {
  return (
    <div key={props.id} className="todo-item">
      {props.title}
    </div>
  );
}
