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

    //  const filmeAtualizado = {
        
    //      "title": request.body,
    //      "description": request.body
          
    //  }

    for(var i = 0; i < filmes.length; i++){
        if(filmes[i].id === id){
            const index = filmes[i];
            const filmeAtualizadoComId = {id, ...filmeAtualizado}
            console.log(filmeAtualizadoComId);
            filmes.splice(index, 1, filmeAtualizadoComId);
            
            return response.status(200).send("Atualizado com sucesso!");
        }else{
            return response.status(404).send("erro")
        }
       
    }   
}



const deleteFilmes = (request, response) => {
    const id = parseInt(request.params.id);

    for(var i = 0; i < filmes.length; i++){
        const index = filmes[i];
        if(filmes[i].id === id){
            filmes.splice(index,1);
            return response.status(201).send("Apagado com sucesso!");
        }else{
            return response.status(404).send("Não foi possível apagar o filme!")
        }
    }   
}


module.exports = {
    getAll,
    postFilmes,
    deleteFilmes,
    putFilmes
}