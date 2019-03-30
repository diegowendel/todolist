import React, { Component } from 'react';

import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tarefa').then(res => {
      this.setState({ tasks: res.data });
    });
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Data de Criação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.tasks.map((task, index) =>
              <TableRow key={index}>
                <TableCell component="th" scope="row">{task.nome}</TableCell>
                <TableCell align="right">{task.tipo}</TableCell>
                <TableCell align="right">{task.data}</TableCell>
                <TableCell align="right">{task.status}</TableCell>
                <TableCell align="right">{task.dataCriacao}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default TaskList;
