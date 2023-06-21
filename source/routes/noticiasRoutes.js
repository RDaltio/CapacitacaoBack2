import express from "express";
import noticiasController from "../controllers/noticiasController.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = express.Router();

router
  .get("/noticias", noticiasController.listarNoticias)
  .get("/noticias/:id", noticiasController.listarNoticiasPorId)
  .post("/noticias", noticiasController.cadastrarNoticias)
  .put("/noticias/:id", checkToken, noticiasController.atualizarNoticias)
  .delete("/noticias/:id", checkToken, noticiasController.deletarNoticias)

export default router;