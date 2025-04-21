import { React, useContext } from "react";
import useToggle from "../hooks/useToggle";
import FeatureButton from "./FeatureButton";
import { TodosContext } from "../context/TodosContext";

export default function FeaturesSection() {
  const [toggleFeatureOne, setToggleFeatureOne] = useToggle();
  const [toggleFeatureTwo, setToggleFeatureTwo] = useToggle();

  const { todos, setTodos, setFilter } = useContext(TodosContext);

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
    <>
      <div className="buttons-container">
        <button onClick={setToggleFeatureOne}>Features One Toogle</button>
        <button onClick={setToggleFeatureTwo}>Features Two Toogle</button>
      </div>

      <hr />

      <div className="buttons-container">
        <FeatureButton toggleFeature={toggleFeatureTwo} feature={completeTodos}>
          Check All
        </FeatureButton>
        <FeatureButton
          toggleFeature={toggleFeatureOne}
          feature={() => setFilter("todas")}
        >
          All
        </FeatureButton>
        <FeatureButton
          toggleFeature={toggleFeatureOne}
          feature={() => setFilter("por-fazer")}
        >
          Active
        </FeatureButton>
        <FeatureButton
          toggleFeature={toggleFeatureOne}
          feature={() => setFilter("feitas")}
        >
          Completed
        </FeatureButton>
        <FeatureButton
          toggleFeature={toggleFeatureTwo}
          feature={deleteCompletedTodos}
        >
          Clear Completed
        </FeatureButton>
      </div>
    </>
  );
}
