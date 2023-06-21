import mongoose from "mongoose";

const noticiasSchema = new mongoose.Schema(
    {
        autor: { type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true },
        titulo: { type: String, required: true },
        categoria: { type: String, required: true },
        conteudo: { type: String, required: true },
        dataCriacao: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
)

const noticias = mongoose.model("noticias", noticiasSchema)

export default noticias;