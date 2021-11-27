
const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils');

const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id:ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id,product) =>{
    const collection = await Database(COLLECTION);
    const options = { upsert: true }
    let result = await collection.updateOne({_id:ObjectId(id)}, { $set: { ...product } }, options)
    return result;
}

const deletee = async(id) =>{
    const collection = await Database(COLLECTION);
    return collection.deleteOne({_id:ObjectId(id)})
}


const generateReport =async (name, res) =>{
    let products = await getAll();
    ProductsUtils.exelGenerator(products, name, res)
}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    deletee,
    update

}