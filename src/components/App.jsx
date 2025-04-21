import { useState } from "react";
import "../App.css";
import TodoItem from "./TodoItem";
import { TodosContext } from "../context/TodosContext";
import useLocalStorage from "../hooks/useLocalStorage";
import RemainingItems from "./RemainingItems";

function App() {
  const [todos, setTodos] = useLocalStorage("tarefas", []);

  const [input, setInput] = useState("");

  // Função para termos o valor do Input cada vez que o utilizador insere algo
  function handleInput(event) {
    const novaTarefa = event.target.value;
    setInput(novaTarefa);
  }

  // Adiciona a tarefa quando ela não está vazia
  function addTodo(event) {
    event.preventDefault();

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
  const [lastId, setLastId] = useLocalStorage("lastId", 1);

  const [filter, setFilter] = useState("todas");

  // Vai retornar as tarefas que correspondam a um determinado filtro
  function filteredTodos(filter) {
    switch (filter) {
      case "todas":
        return todos;

      case "por-fazer":
        return todos.filter((todo) => todo.done === false);

      case "feitas":
        return todos.filter((todo) => todo.done === true);

      default:
        return todos;
    }
  }

  // Vai fazer que todas as tarefas fiquem completas
  function completeTodos() {
    const updatedTodos = todos.map((todo) => {
      todo.done = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  // Vai apagar todas as tarefas completas
  function deleteCompletedTodos() {
    setTodos([...todos].filter((todo) => !todo.done));
  }

  return (
    <main>
      <div className="form-container">
        <div className="header">
          <h3>APP de Tarefas</h3>

          <RemainingItems tarefasPorFazer={filteredTodos} />
        </div>

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
          <div className="todos-container">
            {filteredTodos(filter).map(({ id, title, done, isEditing }) => (
              <TodoItem
                id={id}
                title={title}
                done={done}
                isEditing={isEditing}
              />
            ))}
          </div>
        </TodosContext.Provider>

        <div className="filter-container">
          <button onClick={completeTodos}>Check All</button>
          <button onClick={() => setFilter("todas")}>All</button>
          <button onClick={() => setFilter("por-fazer")}>Active</button>
          <button onClick={() => setFilter("feitas")}>Completed</button>
          <button onClick={deleteCompletedTodos}>Clear Completed</button>
        </div>
      </div>
    </main>
  );
}

export default App;
