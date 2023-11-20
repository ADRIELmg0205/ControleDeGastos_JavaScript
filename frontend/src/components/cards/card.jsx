import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = useState(false);
  const formatarData = (data) => {
    const dataFormatada = new Date(data).toLocaleString(); // Aqui você pode ajustar o formato conforme necessário

    return dataFormatada;
  };
  return (
    <div>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        category={props.category}
        cost={props.cost}
        data={props.data}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>

        <p className="card-id">{props.id}</p>
        <p className="card-cost"><strong>{props.name}</strong> - ({formatarData(props.data)})  - {props.category} de R${props.cost}</p>

      </div>
    </div>
  );
}