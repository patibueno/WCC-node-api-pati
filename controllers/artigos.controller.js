const database = require("../models");
const tabelaArtigos = database.artigos;

exports.create = (req, res) => {
  const artigo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    publicado: req.body.publicado,
  };

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
        res.send(data);
      } else {
        res.send("Não há dados disponíveis para a visualização");
      }
    })
    .catch(() => res.status(500).send("Ocorreu um erro "));
};

exports.findById = (req, res) => {
  const { id } = req.query;
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

exports.findByTitulo = (req, res) => {
  const { titulo } = req.query;
  tabelaArtigos

    .findOne({ where: { titulo } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send(
            `Não foi possível encontrar nenhum artigo com o título ${titulo} `
          );
      }
    })
    .catch(() =>
      res
        .status(500)
        .send(`Ocorreu um erro ao buscar o artigo com o título ${titulo}`)
    );
};

exports.update = (req, res) => {
  tabelaArtigos
    .update(req.body, { where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch(() => res.status(500).send("Ocorreu um erro "));
};

exports.delete = (req, res) => {
  tabelaArtigos
    .destroy({ where: { id: req.params.id } })
    .then((data) => res.send(data))
    .catch(() => res.status(500).send("Ocorreu um erro "));
};
