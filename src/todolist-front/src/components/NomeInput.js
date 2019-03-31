import React from 'react';
import { Form } from 'react-bootstrap';

const NomeInput = (props) => {
  return (
    <Form.Group controlId="nome">
      <Form.Label>Tarefa</Form.Label>
      <Form.Control
        type="text"
        placeholder="Nome da tarefa"
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
};

export default NomeInput;
