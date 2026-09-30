const Cliente = require('../models/Cliente')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res) =>{
    const valores = req.body 

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.celular){
        return res.status(400).json({message: 'Prencha todos os campos!'})
    }

    if(valores.cpf.length === 11){
        return res.status(400).json({message: 'CPF inválido!'})
    }

    try{
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCripto,
            celular: valores.celular
        })

        res.status(201).json({message: 'Cliente cadastrado com sucesso!'})
    }catch(err){
        console.error('Erro ao cadastrar o ciclista1',err)
        res.status(500).json({message: 'Erro ao cadastrar cliente!'})
    }
}

const listar = async(req,res) =>{

    try{
        const dados = await Cliente.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar clientes!',err)
        res.status(500).json('Erro ao listar clientes!')
    }
}

const consultarPorcelular = async (req, res) => {
    const celular = req.query.celular
    console.log(celular)

    try {
        let dados = await Usuario.findOne({
            where: { celular: celular }
        })

        if (!dados) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        } else {
            res.status(200).json(dados)
        }

    }catch(err) {
        console.log('Erro ao consultar usuário!', err)
        res.status(500).json({ message: 'Erro ao consultar usuário!' })
    }
}