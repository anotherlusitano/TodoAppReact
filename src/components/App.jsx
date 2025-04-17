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
        id: lastId,
        title: input,
        done: false,
      },
    ]);

    setLastId(lastId + 1);
    setInput("");
  }

  // Usamos isto para não ter Ids duplicados
  const [lastId, setLastId] = useState(4);

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

        {todos.map(({ id, title, done }) => (
          <TodoItem
            id={id}
            title={title}
            done={done}
            deleteTodo={() => deleteTodo(id)}
            markAsDone={() => markAsDone(id)}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
