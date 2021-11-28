const { ObjectId } = require('mongodb');
const { Database } = require('../database/index');

const COLLECTION = 'users';


const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id:ObjectId(id)})
}

const update = async (id, user) =>{
    const collection = await Database(COLLECTION);
    const options = { upsert : true };
    const updateDoc = { $set: {... user}};
    const filter = { _id:ObjectId(id)}
    const result = await collection.updateOne(filter,updateDoc, options);
    return result;
}

const deletee = async (id) => {
    const collection = await Database(COLLECTION);
    const filter = { _id:ObjectId(id)}
    const result = collection.deleteOne(filter);
    return result;
}



module.exports.UsersService = {
    create,
    getAll,
    getById,
    update,
    deletee
}