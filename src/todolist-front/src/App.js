import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import FilterArea from './components/FilterArea';
import TaskTableArea from './components/TaskTableArea';
import CreateTaskModal from './components/CreateTaskModal';
import Spinner from './components/Spinner';
import SimpleModal from './components/SimpleModal';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      nome: '',
      tipo: undefined,
      dataExata: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      showModalCriacao: undefined,
      showModalRemocao: undefined,
      taskSelected: undefined,
      carregando: undefined
    };

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onCloseModalCriacao = this.onCloseModalCriacao.bind(this);
    this.onCloseModalRemocao = this.onCloseModalRemocao.bind(this);
    this.onShowModalCriacao = this.onShowModalCriacao.bind(this);
    this.onShowModalRemocao = this.onShowModalRemocao.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
    this.onRemoveTask = this.onRemoveTask.bind(this);
  }

  componentDidMount() {
    this.onSearch();
  }

  onChangeNome(event) {
    this.setState({nome: event.target.value});
  }

  onChangeTipo(tipo) {
    this.setState({ tipo });
  }

  onSearch() {
    this.setState({carregando: true});
    axios.get(`http://localhost:5000/tarefa?nome=${this.state.nome}`).then(res => {
      this.setState({
        carregando: undefined,
        tasks: res.data
      });
    });
  }

  onCloseModalCriacao() {
    this.setState({
      carregando: undefined,
      showModalCriacao: undefined
    });
  }

  onCloseModalRemocao() {
    this.setState({
      carregando: undefined,
      showModalRemocao: undefined,
      taskSelected: undefined
    });
  }

  onShowModalCriacao() {
    this.setState({showModalCriacao: true});
  }

  onShowModalRemocao(task) {
    this.setState({
      showModalRemocao: true,
      taskSelected: task
    });
  }

  onCreateTask(data) {
    this.setState({carregando: true});
    axios.post('http://localhost:5000/tarefa', data).then(res => {
      this.onCloseModalCriacao();
      this.onSearch();
    }).catch(err => {
      this.onCloseModalCriacao();
    });
  }

  onRemoveTask() {
    this.setState({carregando: true});
    axios.delete(`http://localhost:5000/tarefa/${this.state.taskSelected.id}`).then(res => {
      this.onCloseModalRemocao();
      this.onSearch();
    }).catch(err => {
      this.onCloseModalRemocao();
    });
  }

  render() {
    return (
      <div className="App painel-filtros">
        <FilterArea
          nome={this.state.nome}
          tipo={this.state.tipo}
          onChangeNome={this.onChangeNome}
          onChangeTipo={this.onChangeTipo}
          onSearch={this.onSearch}
          onCreate={this.onShowModalCriacao}/>
        <TaskTableArea tasks={this.state.tasks}
          onRemove={this.onShowModalRemocao} />

        {/* Modal de criação */}
        <CreateTaskModal
          show={this.state.showModalCriacao}
          onClose={this.onCloseModalCriacao}
          onSave={this.onCreateTask}/>

        {/* Modal de remoção */}
        <SimpleModal title="Excluir tarefa"
          show={this.state.showModalRemocao}
          onClose={this.onCloseModalRemocao}
          onConfirm={this.onRemoveTask}
        >
          <p>Deseja confirmar a exclusão da tarefa?</p>
        </SimpleModal>

        {this.state.carregando && <Spinner />}
      </div>
    );
  }
}

export default App;
