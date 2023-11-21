import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    cost: props.cost,
    category: props.category,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      cost: editValues.cost,
      category: editValues.category,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id == editValues.id
            ? {
                id: editValues.id,
                name: editValues.name,
                cost: editValues.cost,
                category: editValues.category,
                data: values.data,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Alterar</DialogTitle>
        
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descrição"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="Valor"
            defaultValue={props.cost}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'white', backgroundColor: 'blue' }} onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button style={{ color: 'white', backgroundColor: 'red' }} onClick={() => handleDeleteGame()}>
            Deletar
          </Button>
          <Button style={{ color: 'white', backgroundColor: 'green' }} onClick={() => handleEditGame()}>
            Alterar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}