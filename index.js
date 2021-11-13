const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Minha primeira requisição");
});

app.get("/segunda-req", (req, res) => {
  res.send("Minha segunda requisição");
});

app.get("/com-parametros", (req, res) => {
  res.send("Com parâmetros funciona " + req.query.nome);
});

app.listen(port, () => console.log(`Ouvindo a porta: ${port}`));
