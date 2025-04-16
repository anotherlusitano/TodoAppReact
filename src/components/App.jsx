import { useState } from "react";
import "../App.css";
import TodoItem from "./TodoItem";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Comprar algo",
      done: false,
    },
    {
      id: 2,
      title: "Dormir",
      done: false,
    },
    {
      id: 3,
      title: "Passear",
      done: false,
    },
  ]);

  const [input, setInput] = useState("");

  // Função para termos o valor do Input cada vez que o utilizador insere algo
  function handleInput(event) {
    const novaTarefa = event.target.value;
    setInput(novaTarefa);
  }

  // Adiciona a tarefa quando ela não está vazia
  function addTodo() {
    if (input.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: input,
        done: false,
      },
    ]);

    setInput("");
  }

  // Vai percorrer todos as tarefas e remover a tarefa com o id recebido
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <main>
      <div className="form-container">
        <h3>TODO App 👍</h3>

        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={input}
            placeholder="Insere uma tarefa"
            onChange={handleInput}
          />
        </form>

        {todos.map(({ id, title }) => (
          <TodoItem id={id} title={title} deleteTodo={() => deleteTodo(id)} />
        ))}
      </div>
    </main>
  );
}

export default App;
