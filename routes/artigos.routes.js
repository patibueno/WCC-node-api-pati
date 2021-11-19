module.exports = (app) => {
  const artigosController = require("../controllers/artigos.controller.js");
  let router = require("express").Router();

  router.get("/findAll", artigosController.findAll);
  router.post("/", artigosController.create);

  app.use("/artigos", router);
};
