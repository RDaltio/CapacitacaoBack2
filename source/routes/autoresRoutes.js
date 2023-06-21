import express from "express";
import autoresController from "../controllers/autoresController.js";
import {checkToken}  from "../middlewares/checkToken.js";

const router = express.Router();

router
  .get("/autores", checkToken, autoresController.listarAutores)
  .get("/autores/:id", autoresController.listarAutoresPorId)
  .post("/autores", autoresController.cadastrarAutores)
  .post("/autores/login", autoresController.loginAutor)
  .put("/autores/:id", checkToken, autoresController.atualizarAutores)
  .delete("/autores/:id", checkToken, autoresController.deletarAutores)

export default router;