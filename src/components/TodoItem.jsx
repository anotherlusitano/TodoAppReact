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

  // Vai ativar o modo de edição para o utilizador poder editar a tarefa
  function letsEdit(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = true;
        }
        return todo;
      })
    );
  }

  // Vai percorrer todos as tarefas e remover a tarefa com o id recebido
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Marca a tarefa como feita ou por fazer, consoante o estado dela
  function markAsDone(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    );
  }

  return (
    <div key={props.id} className="todo-item">
      <div>
        <input
          type="checkbox"
          value={props.id}
          onChange={() => markAsDone(props.id)}
          checked={props.done}
        />
        {!props.isEditing ? (
          <span
            onDoubleClick={() => letsEdit(props.id)}
            className={props.done ? "completa" : ""}
          >
            {props.title}
          </span>
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
            onBlur={() => cancelEdit(props.id)}
          />
        )}
      </div>
      <button className="delete-todo-btn" onClick={() => deleteTodo(props.id)}>
        <AiOutlineClose size={20} alignmentBaseline="middle" />
      </button>
    </div>
  );
}
