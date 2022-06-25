const Crypto = require('../Models/Crypto');
const User = require('../Models/User');

exports.searchAll = async (search) => Crypto.find({ name: { $regex: new RegExp(search, "i") } }).lean();


exports.getAll = async () => Crypto.find().lean();


exports.getOne = (id) => Crypto.findById(id).lean();


exports.create = (crypto) => Crypto.create(crypto);


exports.edit = (id, cryptoData) => Crypto.updateOne({ _id: id }, { $set: cryptoData }, { runValidators: true });


exports.delete = (id) => Crypto.findByIdAndDelete(id);


exports.dataInfo = async (id, toPopulate) => Crypto.findById(id).populate(toPopulate).lean();


exports.addUsersToCrypto = (userId, cryptoId) => Crypto.updateOne({ _id: cryptoId }, { $push: { buyACrypto: userId } });//push users who booked the to the Crypto model
