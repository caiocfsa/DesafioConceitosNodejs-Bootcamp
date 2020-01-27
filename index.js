const express = require('express');


//Criando um servidor na funcao express
const server = express();


//Utilizando json para Requisicoes
server.use(express.json());


//criando array de usuarios
const projects = [];


//Middleware Local para check de Projeto 
function CheckProjectExists(req, res, next){
  const {id } = req.params;
    const project = projects.search(p=>p.id == id);

  if(!project){
    return res.status(400).json({error: 'Projeto não encontrado'});
  }
    return next();
}



//Listagem de todos os projetos
server.get('/projects', (req, res)=>{
    return res.json(projects);

})



//Criação de projetos
server.post('/projects', CheckProjectExists,  (req, res)=>{
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  return res.json(project);

})

//Alteração de Projeto pelo id
server.put('/projects/:id', CheckProjectExists, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p=> p.id == id);

  project.title = title;

  return res.json(project);
})

//Deletar projeto pelo ID
server.delete('/project/:id', CheckProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  
  projects.splice(index, 1);

  return res.json(projects);
})

//Porta do Servidor Node
server.listen(3009);