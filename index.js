const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Minha primeira requisição");
});

app.get("/segunda-req", (req, res) => {
  res.send("Minha segunda requisição");
});

app.get("/com-parametros", (req, res) => {
  res.send("Com parâmetros funciona " + req.query.nome);
});

app.post("/meu-primeiro-post", (req, res) => {
  console.log(req.body);
  res.send("Meu primeiro post funciona");
});

app.put("/meu-primeiro-put/:id", (req, res) => {
  console.log(req.body, req.params.id);
  res.send("Meu primeiro put funciona");
});

app.delete("/meu-primeiro-delete/:id", (req, res) => {
  console.log(req.params)
  res.send("Meu primeiro delete funciona");
});

app.listen(port, () => console.log(`Ouvindo a porta: ${port}`));
