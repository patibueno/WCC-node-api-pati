module.exports = (app) => {
  const artigosController = require("../controllers/artigos.controller.js");
  let router = require("express").Router();

  router.get("/", artigosController.findAll);
  router.get("/findByTitle", artigosController.findByTitle);
  router.get("/findById", artigosController.findById);
  router.get("/findAllPublished", artigosController.findAllPublished);
  router.post("/", artigosController.create);
  router.put("/update/:id", artigosController.update);
  router.delete("/", artigosController.deleteAll);
  router.delete("/delete/:id", artigosController.delete);
 

  app.use("/artigos", router);
};
