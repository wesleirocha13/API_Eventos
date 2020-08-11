'use strict'

const mongoose = require("mongoose");
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, "title price slug "); // o active:true só traz produtos ativos (fiz um filtro, posso colocar mais campos), eo "title price ..", serve pra trazer os campos desejados 
    return res;    
}

exports.getBySlug = async (slug) => {
    // o active:true só traz produtos ativos (fiz um filtro, posso colocar mais campos), eo "title price ..", serve pra trazer os campos desejados 
    // findOne traz só um resultado
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, "title price slug tags");
    return res;
}

exports.getById = async (id) => {
    // findById pesquisa pelo id
    const res = await Product
        .findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    // findById pesquisa pelo id
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, "title price slug tags");
    return res;
}

exports.create = async (body) => {
    var product = new Product(body);
    await product.save();
}

exports.update = async (id, body) => {
    await Product
        .findByIdAndUpdate(id, {
            // procura pelo o id e atualiza os campos desejados
            $set: {
                title: body.title,
                description: body.description,
                price: body.price,
                slug: body.slug
            }
        });
}

exports.delete = async (id) => {
    //Com o req.body.id ele recebe o paremtro do corpo da requisição, utilizo isso caso eu não queira exibir o id
    await Product
        .findOneAndRemove(id);
}