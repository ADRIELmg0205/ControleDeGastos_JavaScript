import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    cost: "",
    category: "entrada", // Valor padrão "entrada"
  });
  const [listCard, setListCard] = useState([]);

  const calcularCustoTotal = () => {
    return listCard.reduce((total, card) => {
      if (card.category.toLowerCase() === "saida") {
        return total - parseFloat(card.cost);
      } else {
        return total + parseFloat(card.cost);
      }
    }, 0).toFixed(2);
  };

  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            cost: values.cost,
            category: values.category,
            data: response.data[0].data,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleAddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Controle de Gastos</h1>

        <input
          type="text"
          name="name"
          placeholder="Descrição"
          className="register-input-descricao"
          onChange={handleAddValues}
        />
        <input
          type="text"
          placeholder="Valor"
          name="cost"
          className="register-input-valor"
          onChange={handleAddValues}
        />

        <select
          name="category"
          className="register-input-entrada-saida"
          value={values.category}
          onChange={handleAddValues}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <button onClick={handleRegisterGame} className="register-button">
          Inserir
        </button>

        <p className="saldo-total">Total : R$ {calcularCustoTotal()}</p>

      </div>
    <div className="app-container-2">
      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          data={val.data}
          category={val.category}
        />
      ))}
    </div>  
    </div>
  );
}
