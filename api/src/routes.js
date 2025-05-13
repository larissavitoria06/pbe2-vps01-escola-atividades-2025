const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/alunos');
const Atividade = require('./controllers/atividade');
routes.get('/', (req, res) => {
  return res.json({ titulo: 'Escola ACME' });
});

routes.post('/al', Aluno.create);
routes.get('/al', Aluno.read);
routes.get('/al/:ra', Aluno.readOne);
routes.put('/al/:ra', Aluno.update);
routes.delete('/al/:ra', Aluno.remove);


routes.post('/at', Atividade.create);
routes.get('/at', Atividade.read);
routes.get('/at/:id', Atividade.readOne);
routes.put('/at/:id', Atividade.update);
routes.delete('/at/:id', Atividade.remove);

module.exports = routes;
