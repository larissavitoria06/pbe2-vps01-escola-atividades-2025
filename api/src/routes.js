const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/alunos');
const Atividade = require('./controllers/atividade');
routes.get('/', (req, res) => {
  return res.json({ titulo: 'Escola ACME' });
});

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.put('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);


routes.post('/atividades', Atividade.create);
routes.get('/atividades', Atividade.read);
routes.get('/atividades/:id', Atividade.readOne);
routes.put('/atividades/:id', Atividade.update);
routes.delete('/atividades/:id', Atividade.remove);

module.exports = routes;
