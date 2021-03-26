const filmes = require("../model/filmes.json");
const helper = require('../helper/helper');

const getAll = (request, response) => {
    console.log(request.url);
    response.status(200).send(filmes);
}

const postFilmes = (request, response) => {
    console.log(request.url);
    const { title, description } = request.body;

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
    const id = parseInt(request.params.id);

    const filmeIds = filmes.map(filmes => filmes.id)

    const atualizaId = filmeIds.indexOf(id)

    const filmeAtualizadacomId = { id, ...filmeAtualizado }
    filmes.splice(atualizaId, 1, filmeAtualizadacomId)

    return response.status(200).send(filmes.find(filmes => filmes.id === id))

}

const patchFilmes = (request, response) => {
    const filmeAtualizacao = request.body;
    const id = parseInt(request.params.id);
    const filmeParaAtualizar = filmes.find(filmes => filmes.id === id)

    for (chave in filmeAtualizacao) {
        filmeParaAtualizar[chave] = filmeAtualizacao[chave]
    }

    return response.status(200).send(filmeParaAtualizar);
}

const deleteFilmes = (request, response) => {
    const id = parseInt(request.params.id);

    for (var i = 0; i < filmes.length; i++) {
        const index = filmes[i];
        if (filmes[i].id === id) {
            filmes.splice(index, 1);
            return response.status(201).send("Apagado com sucesso!");
        } else {
            return response.status(404).send("Não foi possível apagar o filme!")
        }
    }
}


module.exports = {
    getAll,
    postFilmes,
    deleteFilmes,
    putFilmes,
    patchFilmes
}