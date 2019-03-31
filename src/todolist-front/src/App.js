import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import FilterArea from './components/FilterArea';
import TaskTableArea from './components/TaskTableArea';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      nome: '',
      tipo: undefined,
      dataExata: undefined,
      dataInicio: undefined,
      dataFim: undefined
    };

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.onSearch = this.onSearch.bind(this);
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
    axios.get(`http://localhost:5000/tarefa?nome=${this.state.nome}`).then(res => {
      this.setState({ tasks: res.data });
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
          onSearch={this.onSearch}/>
        <TaskTableArea tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
