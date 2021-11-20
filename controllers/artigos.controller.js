const database = require("../models");
const tabelaArtigos = database.artigos;

exports.create = (req, res) => {
  const artigo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    publicado: req.body.publicado,
  };

  if (!artigo.titulo) {
    return res.status(400).send("O título precisa ser definido");
  }
  tabelaArtigos
    .create(artigo)
    .then(() => res.send("Artigo criado com sucesso"))
    .catch(() => res.status(500).send("Ocorreu um erro ao salvar o artigo"));
};

exports.findAll = (req, res) => {
  tabelaArtigos
    .findAll()
    .then((data) => {
      if (data.length !== 0) {
        res.status(200).send(data);
      } else {
        res.status(400).send("Não há dados disponíveis para a visualização");
      }
    })
    .catch(() => res.status(500).send("Ocorreu um erro "));
};

exports.findAllPublished = (req, res) => {
  tabelaArtigos
    .findAll({ where: { publicado: true } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => res.status(500).send("Ocorreu um erro"));
};

exports.findById = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .send(`Não foi possível encontrar pois o id não foi informado`);
  }

  tabelaArtigos
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send(`Não foi possível encontrar nenhum artigo com o id ${id} `);
      }
    })

    .catch(() =>
      res.status(500).send(`Ocorreu um erro ao buscar o artigo com o id ${id}`)
    );
};

exports.findByTitle = (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res
      .status(400)
      .send(`Não foi possível encontrar pois o título não foi informado`);
  }
  tabelaArtigos
    .findOne({ where: { titulo: title } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send(
            `Não foi possível encontrar nenhum artigo com o título ${title} `
          );
      }
    })
    .catch(() =>
      res
        .status(500)
        .send(`Ocorreu um erro ao buscar o artigo com o título ${title}`)
    );
};

exports.update = (req, res) => {
  const { id } = req.params;

  tabelaArtigos
    .update(req.body, { where: { id }, returning: true })
    .then((data) => {
      const linhasAtualizadas = data[0];
      if (linhasAtualizadas === 0) {
        res.status(404).send(`Não foi encontrado nenhum artigo com o id ${id}`);
      } else {
        res.status(200).send(data[1][0]);
      }
    })
    .catch(() => res.status(500).send("Ocorreu um erro "));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  tabelaArtigos
    .destroy({ where: { id } })
    .then((data) => {
      if (data == 1) {
        res
          .status(200)
          .send(`O artigo com o id ${id} foi deletado com sucesso!`);
      } else {
        res.status(404).send(`O artigo com o id ${id} não foi encontrado`);
      }
    })
    .catch((error) => res.status(500).send(error));
};

exports.deleteAll = (req, res) => {
  tabelaArtigos
    .destroy({ where: {}, truncate: false })
    .then((itemsDeletados) =>{
      res.status(200).send(`Foram deletados  ${itemsDeletados} artigos`);
    })
    .catch((error) => {
      res.status(500).send("Ocorreu um erro ao deletar os artigos");
    });
};