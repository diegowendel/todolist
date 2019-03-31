import React from 'react';
import { Table, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonWithTooltip from './ButtonWithTooltip';

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
              <th></th>
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
                <td>
                  <ButtonToolbar>
                    <ButtonWithTooltip variant="info"
                      tooltip="Editar tarefa">
                      <FontAwesomeIcon icon={faEdit} />
                    </ButtonWithTooltip>
                    <ButtonWithTooltip variant="danger"
                      tooltip="Excluir tarefa"
                      onClick={() => props.onRemove(task)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ButtonWithTooltip>
                  </ButtonToolbar>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TaskTableArea;
