import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import FilterArea from './components/FilterArea';
import TaskTableArea from './components/TaskTableArea';
import CreateTaskModal from './components/CreateTaskModal';
import Spinner from './components/Spinner';
import SimpleModal from './components/SimpleModal';
import EditTaskModal from './components/EditTaskModal';
import Moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      showModalCriacao: undefined,
      showModalEdicao: undefined,
      showModalRemocao: undefined,
      taskSelected: undefined,
      carregando: undefined
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCloseModalCriacao = this.onCloseModalCriacao.bind(this);
    this.onCloseModalEdicao = this.onCloseModalEdicao.bind(this);
    this.onCloseModalRemocao = this.onCloseModalRemocao.bind(this);
    this.onShowModalCriacao = this.onShowModalCriacao.bind(this);
    this.onShowModalEdicao = this.onShowModalEdicao.bind(this);
    this.onShowModalRemocao = this.onShowModalRemocao.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onFinishTask = this.onFinishTask.bind(this);
    this.onRemoveTask = this.onRemoveTask.bind(this);
    this.onReopenTask = this.onReopenTask.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
  }

  componentDidMount() {
    this.onSearch();
  }

  onSearch(dto) {
    this.setState({carregando: true});

    let query = 'http://localhost:5000/tarefa';
    if (dto) {
      query += `?nome=${dto.nome}`;
      if (dto.tipo) {
        query += `&tipo=${dto.tipo.value}`;
      }
      if (dto.statusConcluida) {
        query += `&status=CONCLUIDA`;
      }
      if (dto.statusPendente) {
        query += `&status=PENDENTE`;
      }
      if (dto.dataInicio) {
        query += `&dataInicio=${Moment(dto.dataInicio).startOf('day').format("YYYY-MM-DD HH:mm:ss")}`;
      }
      if (dto.dataFim) {
        query += `&dataFim=${Moment(dto.dataFim).endOf('day').format("YYYY-MM-DD HH:mm:ss")}`;
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

  onCloseModalEdicao() {
    this.setState({
      carregando: undefined,
      showModalEdicao: undefined,
      taskSelected: undefined
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

  onShowModalEdicao(task) {
    this.setState({
      showModalEdicao: true,
      taskSelected: task
    });
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

  onEditTask(dto) {
    this.setState({carregando: true});
    axios.put('http://localhost:5000/tarefa', dto).then(res => {
      this.onCloseModalEdicao();
      this.onSearch();
    }).catch(err => {
      this.onCloseModalEdicao();
    });
  }

  onFinishTask(dto) {
    this.setState({carregando: true});
    dto.status = 'CONCLUIDA';
    axios.put('http://localhost:5000/tarefa', dto).then(res => {
      this.setState({carregando: undefined});
      this.onSearch();
    }).catch(err => {
      this.setState({carregando: undefined});
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

  onReopenTask(dto) {
    this.setState({carregando: true});
    dto.status = 'PENDENTE';
    axios.put('http://localhost:5000/tarefa', dto).then(res => {
      this.setState({carregando: undefined});
      this.onSearch();
    }).catch(err => {
      this.setState({carregando: undefined});
    });
  }

  sortTasks(property, isAscendente) {
    const ascendente = (a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    }

    const descendente = (a, b) => {
      if (a[property] > b[property]) return -1;
      if (a[property] < b[property]) return 1;
      return 0;
    }

    let tasksSorted = this.state.tasks.sort(isAscendente ? ascendente : descendente);
    this.setState({tasks: tasksSorted});
  }

  render() {
    return (
      <div className="App painel-filtros">
        <header style={{marginTop: '20px', position: 'relative'}}>
          <img className="main-image" src={`${process.env.PUBLIC_URL}/check.svg`} alt="todolist" /> <h1 className="main-text">Todolist app</h1>
        </header>

        <FilterArea
          onSearch={this.onSearch}
          onCreate={this.onShowModalCriacao}/>

        <TaskTableArea tasks={this.state.tasks}
          onEdit={this.onShowModalEdicao}
          onFinish={this.onFinishTask}
          onRemove={this.onShowModalRemocao}
          onReopen={this.onReopenTask}
          sortTasks={this.sortTasks} />

        {/* Modal de criação */}
        <CreateTaskModal
          show={this.state.showModalCriacao}
          onClose={this.onCloseModalCriacao}
          onSave={this.onCreateTask}/>

        {/* Modal de edição */}
        <EditTaskModal
          show={this.state.showModalEdicao}
          onClose={this.onCloseModalEdicao}
          task={this.state.taskSelected}
          onSave={this.onEditTask}/>

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
