import React from "react";

export default function RemainingItems(props) {
  const tarefas = props.tarefasPorFazer("por-fazer");

  return (
    <span className="tarefas-em-falta">
      {tarefas.length} tarefas por fazer!
    </span>
  );
}
