import { useState } from "react";
import "../App.css";
import TodoItem from "./TodoItem";
import { TodosContext } from "../context/TodosContext";
import useLocalStorage from "../hooks/useLocalStorage";
import RemainingItems from "./RemainingItems";
import FeaturesSection from "./FeaturesSection";

function App() {
  const [todos, setTodos] = useLocalStorage("tarefas", []);

  const [input, setInput] = useState("");

  // Usamos isto para não ter Ids duplicados
  const [lastId, setLastId] = useLocalStorage("lastId", 1);

  const [filter, setFilter] = useState("todas");

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
            setFilter,
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

          <FeaturesSection />
        </TodosContext.Provider>
      </div>
    </main>
  );
}

export default App;
