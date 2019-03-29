const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:5000');
const HTTP = require('../utils/HTTP');

let task1 = {
  "nome": "Fazer café",
  "tipo": "PESSOAL",
  "data": "2019-04-01 00:00:00",
  "status": "PENDENTE"
};

let task2 = {
  "nome": "Lavar louça",
  "tipo": "PESSOAL",
  "data": "2019-04-01 00:00:00",
  "status": "PENDENTE"
};

const fakeId = '5c9da4ba9f853b6a431b7f88';

before((done) => {
  api.post('/tarefa')
    .set('Content-Type', 'application/json')
    .send(task1)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(HTTP.CREATED)
    .end((err, res) => {
      task1._id = res.body._id;
      task1.dataCriacao = res.body.dataCriacao;
      done();
    });
});

describe('POST /tarefa', () => {
  it('Criar tarefa: Retorna status HTTP 201 para criação bem sucedida', (done) => {
    api.post('/tarefa')
      .set('Content-Type', 'application/json')
      .send(task2)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.CREATED)
      .end((err, res) => {
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('nome');
        expect(res.body.nome).to.equal('Lavar louça');
        expect(res.body).to.have.property('tipo');
        expect(res.body.tipo).to.equal('PESSOAL');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal('2019-04-01 00:00:00');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal('PENDENTE');
        expect(res.body).to.have.property('dataCriacao');
        task2._id = res.body._id;
        task2.dataCriacao = res.body.dataCriacao;
        done();
    });
  });
});

describe('GET /tarefa', () => {
  it('Buscar tarefa: Retorna status HTTP 200 para busca bem sucedida por todas tarefas', (done) => {
    api.get('/tarefa')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.OK)
      .end((err, res) => {
        expect(res.body).to.deep.include.members([task1, task2]);
        done();
    });
  });

  it('Buscar tarefa: Retorna status HTTP 200 para busca bem sucedida por uma tarefa', (done) => {
    api.get(`/tarefa/${task1._id}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.OK)
      .end((err, res) => {
        expect(res.body).to.have.property('_id');
        expect(res.body._id).to.equal(task1._id);
        expect(res.body).to.have.property('nome');
        expect(res.body.nome).to.equal(task1.nome);
        expect(res.body).to.have.property('tipo');
        expect(res.body.tipo).to.equal(task1.tipo);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal(task1.data);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(task1.status);
        expect(res.body).to.have.property('dataCriacao');
        expect(res.body.dataCriacao).to.equal(task1.dataCriacao);
        done();
    });
  });

  it('Buscar tarefa: Retorna status HTTP 404 para tarefa não encontrada', (done) => {
    api.get(`/tarefa/${fakeId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.NOT_FOUND, done);
  });
});

describe('PUT /tarefa', () => {
  it('Editar tarefa: Retorna status HTTP 200 para edição bem sucedida', (done) => {
    task = {...task2};
    task.status = 'CONCLUIDO';
    api.put('/tarefa')
      .set('Content-Type', 'application/json')
      .send(task)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.OK)
      .end((err, res) => {
        expect(res.body).to.have.property('_id');
        expect(res.body._id).to.equal(task._id);
        expect(res.body).to.have.property('nome');
        expect(res.body.nome).to.equal(task.nome);
        expect(res.body).to.have.property('tipo');
        expect(res.body.tipo).to.equal(task.tipo);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal(task.data);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(task.status);
        expect(res.body).to.have.property('dataCriacao');
        expect(res.body.dataCriacao).to.equal(task.dataCriacao);
        done();
    });
  });

  it('Editar tarefa: Retorna status HTTP 404 para tarefa não encontrada', (done) => {
    task = {...task2};
    task._id = fakeId;
    api.put('/tarefa')
      .set('Content-Type', 'application/json')
      .send(task)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.NOT_FOUND, done);
  });
});

describe('DELETE /tarefa', () => {
  it('Remover tarefa: Retorna status HTTP 200 para remoção bem sucedida', (done) => {
    api.delete(`/tarefa/${task2._id}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.OK, done);
  });

  it('Remover tarefa: Retorna status HTTP 404 para tarefa não encontrada', (done) => {
    api.delete(`/tarefa/${fakeId}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(HTTP.NOT_FOUND, done);
  });
});
