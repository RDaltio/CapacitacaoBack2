import mongoose from "mongoose";

const autoresSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    biografia: { type: String, required: true },
    senha: { type: String, required: true },
  }
);

const autores = mongoose.model('autores', autoresSchema);

export default autores;