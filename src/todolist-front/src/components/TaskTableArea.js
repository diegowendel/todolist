import React from 'react';
import { Table } from 'react-bootstrap';

const TaskTableArea = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Status</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {props.tasks.map((task, index) =>
              <tr key={index}>
                <td>{task.nome}</td>
                <td>{task.tipo}</td>
                <td>{task.data}</td>
                <td>{task.status}</td>
                <td>{task.dataCriacao}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TaskTableArea;
