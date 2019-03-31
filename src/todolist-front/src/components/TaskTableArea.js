import React from 'react';
import { Badge, ButtonToolbar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonWithTooltip from './ButtonWithTooltip';
import Moment from 'moment';

const TaskType = {
  'PESSOAL': 'Pessoal',
  'PROFISSIONAL': 'Profissional'
}

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
              <th>Data de Criação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {props.tasks.map((task, index) =>
              <tr key={index}>
                <td>{task.nome}</td>
                <td>{TaskType[task.tipo]}</td>
                <td>{Moment(task.data).format('DD/MM/YYYY')}</td>
                <td>{Moment(task.dataCriacao).format('DD/MM/YYYY')}</td>
                <td>
                  <Badge pill variant={task.status == 'PENDENTE' ? 'warning' : 'success'}>
                    {task.status}
                  </Badge>
                </td>
                <td>
                  <ButtonToolbar className="text-center">
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
