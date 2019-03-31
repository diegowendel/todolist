import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 'PESSOAL', label: 'Pessoal' },
  { value: 'PROFISSIONAL', label: 'Profissional' }
];

const TipoInput = (props) => {
  return (
    <Form.Group controlId="tipo">
      <Form.Label>Tipo</Form.Label>
      <Select
        value={props.value}
        onChange={props.onChange}
        options={options}
        placeholder="Tipo de tarefa"
        isClearable={true}
      />
    </Form.Group>
  );
};

export default TipoInput;
