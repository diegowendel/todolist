import React, { Component } from 'react';

import { Form, ButtonToolbar } from 'react-bootstrap';
import TipoInput from './TipoInput';
import NomeInput from './NomeInput';
import ButtonWithTooltip from './ButtonWithTooltip';
import DateInput from './DateInput';

class FilterArea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      tipo: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      statusPendente: true,
      statusConcluida: true
    };

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeDataInicio = this.onChangeDataInicio.bind(this);
    this.onChangeDataFim = this.onChangeDataFim.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
  }

  onChangeCheckbox(event) {
    this.setState({
      [event.target.id]: event.target.checked
    });
  }

  onChangeDataInicio(dataInicio) {
    this.setState({ dataInicio });
  }

  onChangeDataFim(dataFim) {
    this.setState({ dataFim });
  }

  onChangeNome(event) {
    this.setState({nome: event.target.value});
  }

  onChangeTipo(tipo) {
    this.setState({ tipo });
  }

  render() {
    return(
      <div className="container filter-area">
        <div className="row">
          <div className="col-sm-4">
            <NomeInput value={this.state.nome} onChange={this.onChangeNome}/>
            <TipoInput value={this.state.tipo} onChange={this.onChangeTipo}/>
          </div>
          <div className="col-sm-4">
            <DateInput label="Início" placeholder="Data início" value={this.state.dataInicio} onChange={this.onChangeDataInicio}/>
            <DateInput label="Fim" placeholder="Data fim" value={this.state.dataFim} onChange={this.onChangeDataFim}/>
          </div>
          <div className="col-sm-2">
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Check id="statusPendente" type="checkbox" label="Pendente" checked={this.state.statusPendente} onChange={this.onChangeCheckbox}/>
              <Form.Check id="statusConcluida" type="checkbox" label="Concluída" checked={this.state.statusConcluida} onChange={this.onChangeCheckbox}/>
            </Form.Group>
          </div>
        </div>

        <ButtonToolbar>
          <ButtonWithTooltip variant="secondary"
            tooltip="Buscar tarefas"
            onClick={() => this.props.onSearch(this.state)}>
            Buscar
          </ButtonWithTooltip>
          <ButtonWithTooltip variant="primary"
            tooltip="Criar nova tarefa"
            onClick={this.props.onCreate}>
            Nova tarefa
          </ButtonWithTooltip>
        </ButtonToolbar>

      </div>
    );
  }
};

export default FilterArea;
