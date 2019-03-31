import React from 'react';

import { Form, ButtonToolbar } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TipoInput from './TipoInput';
import NomeInput from './NomeInput';
import ButtonWithTooltip from './ButtonWithTooltip';

const FilterArea = (props) => {
  return(
    <div className="container filter-area">
      <div className="row">
        <div className="col-sm-4">
          <NomeInput value={props.nome} onChange={props.onChangeNome}/>
        </div>
        <div className="col-sm-4">
          <TipoInput value={props.tipo} onChange={props.onChangeTipo}/>
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

      <ButtonToolbar>
        <ButtonWithTooltip variant="secondary"
          tooltip="Buscar tarefas"
          onClick={props.onSearch}>
          Buscar
        </ButtonWithTooltip>
        <ButtonWithTooltip variant="primary"
          tooltip="Criar nova tarefa"
          onClick={props.onCreate}>
          Nova tarefa
        </ButtonWithTooltip>
      </ButtonToolbar>

    </div>
  );
};

export default FilterArea;
