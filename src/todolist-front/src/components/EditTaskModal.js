import React, { Component } from 'react';

import NomeInput from './NomeInput';
import { Button, Modal } from 'react-bootstrap';
import TipoInput from './TipoInput';
import DateInput from './DateInput';
import TaskType from '../utils/TaskType';
import Moment from 'moment';

class EditTaskModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: undefined,
      tipo: undefined,
      data: undefined
    };

    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.show) {
      const task = this.props.task;
      this.setState({
        nome: task.nome,
        tipo: {
          value: task.tipo,
          label: TaskType[task.tipo]
        },
        data: Moment(task.data).toDate()
      })
    }
  }

  onChangeData(data) {
    this.setState({ data });
  }

  onChangeNome(event) {
    this.setState({ nome: event.target.value });
  }

  onChangeTipo(tipo) {
    this.setState({ tipo });
  }

  onSave() {
    let dto = {...this.props.task};
    dto.nome = this.state.nome;
    dto.tipo = this.state.tipo.value;
    dto.data = this.state.data;
    this.props.onSave(dto);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NomeInput value={this.state.nome || ''} onChange={this.onChangeNome}/>
          <TipoInput value={this.state.tipo} onChange={this.onChangeTipo}/>
          <DateInput classes="data-fluid" label="Data" placeholder="Data" value={this.state.data} onChange={this.onChangeData}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={this.onSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditTaskModal;
