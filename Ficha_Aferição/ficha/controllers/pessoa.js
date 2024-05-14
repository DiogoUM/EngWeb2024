var Pessoa = require("../models/pessoa")

module.exports.list = () => {
    return Pessoa.find().sort({nome : 1}).exec()
}

module.exports.findById = _id => {
    return Pessoa
        .findOne({ _id: id })
        .exec()
}

module.exports.insert = Pessoa => {
    return Pessoa.create(Pessoa)
}

module.exports.updatePessoa = id, Pessoa => {
    return Pessoa.updateOne({ _id: id }, Pessoa)
}