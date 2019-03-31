import React, { Component } from 'react';

import NomeInput from './NomeInput';
import { Button, Modal } from 'react-bootstrap';
import TipoInput from './TipoInput';
import DateInput from './DateInput';

class CreateTaskModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      createDTO: {
        nome: undefined,
        tipo: undefined,
        data: undefined
      }
    };

    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeData(data) {
    let dto = {...this.state.createDTO};
    dto.data = data;
    this.setState({ createDTO: dto });
  }

  onChangeNome(event) {
    let dto = {...this.state.createDTO};
    dto.nome = event.target.value;
    this.setState({ createDTO: dto });
  }

  onChangeTipo(tipo) {
    let dto = {...this.state.createDTO};
    dto.tipo = tipo;
    this.setState({ createDTO: dto });
  }

  onSave() {
    let dto = {...this.state.createDTO};
    dto.tipo = this.state.createDTO.tipo.value;
    this.props.onSave(dto);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NomeInput value={this.state.createDTO.nome} onChange={this.onChangeNome}/>
          <TipoInput value={this.state.createDTO.tipo} onChange={this.onChangeTipo}/>
          <DateInput classes="data-fluid" label="Data" placeholder="Data" value={this.state.createDTO.data} onChange={this.onChangeData}/>
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

export default CreateTaskModal;
