module.exports = (app) => {
  const artigosController = require("../controllers/artigos.controller.js");
  let router = require("express").Router();

  router.get("/", artigosController.findAll);
  router.get("/findById", artigosController.findById);
  router.get("/findByTitulo", artigosController.findByTitulo);
  router.post("/", artigosController.create);
  router.put("/update/:id", artigosController.update);
  router.delete("/delete/:id", artigosController.delete);

  app.use("/artigos", router);
};
