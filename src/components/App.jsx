import { useState } from "react";
import "../App.css";
import TodoItem from "./TodoItem";
import { TodosContext } from "../context/TodosContext";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Comprar algo",
      done: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Dormir",
      done: false,
      isEditing: false,
    },
    {
      id: 3,
      title: "Passear",
      done: false,
      isEditing: false,
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
        isEditing: false,
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

        <TodosContext.Provider
          value={{
            todos,
            setTodos,
          }}
        >
          {todos.map(({ id, title, done, isEditing }) => (
            <TodoItem
              id={id}
              title={title}
              done={done}
              isEditing={isEditing}
              letsEdit={() => letsEdit(id)}
              deleteTodo={() => deleteTodo(id)}
              markAsDone={() => markAsDone(id)}
            />
          ))}
        </TodosContext.Provider>
      </div>
    </main>
  );
}

export default App;
