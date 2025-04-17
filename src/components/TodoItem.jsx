import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TodosContext } from "../context/TodosContext";

export default function TodoItem(props) {
  const { todos, setTodos } = useContext(TodosContext);

  // Muda o texto da tarefa e desativa o modo de edição
  function updateTodo(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  // Desativa o modo de edição
  function cancelEdit(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div key={props.id} className="todo-item">
      <div>
        <input
          type="checkbox"
          value={props.id}
          onChange={props.markAsDone}
          checked={props.done}
        />
        {!props.isEditing ? (
          <span onDoubleClick={props.letsEdit}>{props.title}</span>
        ) : (
          <input
            className="editTodo"
            defaultValue={props.title}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateTodo(event, props.id);
              } else if (event.key === "Escape") {
                cancelEdit(props.id);
              }
            }}
            onBlur={(event) => updateTodo(event, props.id)}
          />
        )}
      </div>
      <button className="delete-todo-btn" onClick={props.deleteTodo}>
        <AiOutlineClose size={20} alignmentBaseline="middle" />
      </button>
    </div>
  );
}
