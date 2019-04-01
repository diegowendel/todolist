import React from 'react';
import { Alert, Badge, ButtonToolbar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faExclamationCircle, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonWithTooltip from './ButtonWithTooltip';
import Moment from 'moment';
import TaskType from '../utils/TaskType';

const TaskTableArea = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.tasks.length > 0 ?
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Data de Criação</th>
                <th>Status</th>
                <th width="16%">Ações</th>
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
                    <Badge pill variant={task.status === 'PENDENTE' ? 'warning' : 'success'}>
                      {task.status}
                    </Badge>
                  </td>
                  <td>
                    <ButtonToolbar>
                      {task.status === 'PENDENTE' ?
                        <ButtonWithTooltip variant="success"
                          tooltip="Concluir tarefa"
                          onClick={() => props.onFinish(task)}>
                          <FontAwesomeIcon icon={faCheck} />
                        </ButtonWithTooltip>
                        :
                        <ButtonWithTooltip variant="warning"
                          tooltip="Reabrir tarefa"
                          onClick={() => props.onReopen(task)}>
                          <FontAwesomeIcon icon={faRedo} />
                        </ButtonWithTooltip>
                      }
                      <ButtonWithTooltip variant="info"
                        tooltip="Editar tarefa"
                        onClick={() => props.onEdit(task)}>
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
          :
          <Alert className="container-fluid" variant="danger">
            <FontAwesomeIcon icon={faExclamationCircle} /> Nenhuma tarefa foi encontrada!
          </Alert>
        }
      </div>
    </div>
  );
}

export default TaskTableArea;
