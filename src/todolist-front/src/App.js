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
      showModalCriacao: undefined,
      showModalRemocao: undefined,
      taskSelected: undefined,
      carregando: undefined
    };

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

  onSearch(dto) {
    this.setState({carregando: true});

    let query = 'http://localhost:5000/tarefa';
    if (dto) {
      query += `?nome=${dto.nome}`
      if (dto.tipo) {
        query += `&tipo=${dto.tipo.value}`
      }
      if (dto.statusConcluida) {
        query += `&status=CONCLUIDA`
      }
      if (dto.statusPendente) {
        query += `&status=PENDENTE`
      }
    }

    axios.get(query).then(res => {
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

  onCreateTask(dto) {
    this.setState({carregando: true});
    axios.post('http://localhost:5000/tarefa', dto).then(res => {
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
