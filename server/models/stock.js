
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    code: String
});
module.exports= mongoose.model('Stock', stockSchema, 'stock')
