import autores from "../models/Autores.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class autoresController {
    static listarAutores = async (req, res) => {
        try {
            const autores = await autores.find();
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    static listarAutoresPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autor = await autores.findById(id);
            if (!autor) {
                return res.status(404).json({ message: 'Autor não encontrado' });
            }
            res.status(200).json(autor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    static cadastrarAutores = async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(req.body.senha, salt);

            const autorExists = await autores.findOne({ nome: req.body.nome });
            if (autorExists) {
                return res.status(500).json({ message: 'Autor já existente' });
            }

            const autor = new autores({
                nome: req.body.nome,
                biografia: req.body.biografia,
                senha: passwordHash
            });

            await autor.save();
            res.status(201).json(autor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }



    static loginAutor = async (req, res) => {
        const autorExists = await autores.findOne({ nome: req.body.nome })
        if (!autorExists) {
            return res.status(500).send({ message: 'Autor inexistente.' })
        }

        const checkSenha = await bcrypt.compare(req.body.senha, autorExists.senha)
        if (!checkSenha) {
            return res.status(422).send({ message: 'Senha inválida.' })
        }

        try {
            const secret = process.env.SECRET

            const token = jwt.sign({
                id: autorExists._id,
            }, secret)

            res.status(200).json({ message: 'Autor autenticado!', token });

        } catch (err) {

        }

    }

    static atualizarAutores = async (req, res) => {
        try {
            const id = req.params.id;
            const autor = await autores.findByIdAndUpdate(id, req.body, { new: true });
            if (!autor) {
                return res.status(404).json({ message: 'Autor não encontrado' });
            }
            res.status(200).json(autor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    static deletarAutores = async (req, res) => {
        try {
            const id = req.params.id;
            const autor = await autores.findByIdAndDelete(id);
            if (!autor) {
                return res.status(404).json({ message: 'Autor não encontrado' });
            }
            res.status(200).json({ message: 'Autor deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default autoresController;