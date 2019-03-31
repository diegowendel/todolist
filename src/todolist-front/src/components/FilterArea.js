import React from 'react';

import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const options = [
  { value: 'PESSOAL', label: 'Pessoal' },
  { value: 'PROFISSIONAL', label: 'Profissional' }
];

const FilterArea = (props) => {
  return(
    <div className="container filter-area">
      <div className="row">
        <div className="col-sm-4">
          <Form.Group controlId="nome">
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome da tarefa"
              value={props.nome}
              onChange={props.onChangeNome}
            />
          </Form.Group>
        </div>
        <div className="col-sm-4">
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Select
              value={props.tipo}
              onChange={props.onChangeTipo}
              options={options}
              placeholder="Tipo de tarefa"
              isClearable={true}
            />
          </Form.Group>
        </div>
        <div className="col-sm-4">
          <Form.Group controlId="data">
            <Form.Label>Data</Form.Label>

            <div className="col-sm-2">
            <DayPickerInput className="form-control"
            onDayChange={day => console.log(day)} />
            </div>
            <div className="col-sm-2">
            <DayPickerInput
            onDayChange={day => console.log(day)} />
            </div>

          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1">
          <Button variant="secondary" onClick={props.onSearch}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterArea;
