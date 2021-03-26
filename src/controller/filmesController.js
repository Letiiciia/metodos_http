const filmes = require("../model/filmes.json");
const helper = require('../helper/helper');

const getAll = (request, response) =>{
console.log(request.url);
response.status(200).send(filmes);
}

const postFilmes = (request, response) => {
    console.log(request.url);
    const {title, description} = request.body;

    const novofilme = {
        
        "id": helper.obterNovoValor(filmes),
        "title": title,
        "description": description
          
    }

    filmes.push(novofilme);
    response.status(201).json(novofilme);
}

const putFilmes = (request, response) => {
    const filmeAtualizado = request.body;
    const id = request.params.id;

    for(var i = 0; i < filmes.length; i++){

        if(filmes[i].id === id){
            const index = filmes[i];
            const filmeAtualizadoComId = {id, ...filmeAtualizado}
            filmes.splice(index, 1, filmeAtualizadoComId);
            
            response.status(200).send("Atualizado com sucesso!");
        }else{
            response.status(404).send("Não foi possível atualizar o filme!")
        }
    }   
}

const patch = (request, response) => {
    
}

const deleteFilmes = (request, response) => {
    const id = parseInt(request.params.id);

    for(var i = 0; i < filmes.length; i++){
        const index = filmes[i];
        if(filmes[i].id === id){
            filmes.splice(index,1);
            response.status(201).send("Apagado com sucesso!");
        }else{
            response.status(404).send("Não foi possível apagar o filme!")
        }
    }   
}


module.exports = {
    getAll,
    postFilmes,
    deleteFilmes,
    putFilmes
}