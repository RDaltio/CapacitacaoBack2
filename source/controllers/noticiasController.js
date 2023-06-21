import noticias from "../models/Noticias.js";

class noticiasController {
    static listarNoticias = (req, res) => {
        const {categoria, titulo, dataCriacao} = req.query;
        const filtros = {
            ...(categoria && {categoria:  categoria}),
            ...(titulo && {titulo:  titulo}),
            ...(dataCriacao && {dataCriacao: dataCriacao})
        };
        console.log(filtros);
        noticias.find(filtros)
            .populate('autor')
            .exec((err, noticias) => {
            res.status(200).json(noticias);
        })
    }

    static listarNoticiasPorId = (req,res) => {
        const id = req.params.id;
        noticias.findById(id)
            .populate('autor', 'nome') 
            .exec((err, noticias) => {
            if(err){
                res.status(400).send({message: `${err.message} - ID da notícia não encontrada`})
            } else {
                res.status(200).send(noticias);
            }
        })
    }

    static cadastrarNoticias = async (req, res) => {
        try {
          const { titulo, conteudo } = req.body;
          const autorId = req.payload.id;
      
          const noticia = new noticias({
            titulo,
            conteudo,
            autor: autorId
          });
      
          await noticia.save();
      
          res.status(201).json(noticia);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      

    static atualizarNoticias = (req, res) => {
        const id = req.params.id;

        noticias.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send('Notícia atualizada com sucesso');
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deletarNoticias = (req, res) => {
        const id = req.params.id;

        noticias.findByIdAndDelete(id, (err)=> {
            if(!err){
                res.status(200).send({message: 'Notícia deletada com sucesso'});
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

}

export default noticiasController;