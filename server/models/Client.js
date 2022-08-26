const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {type: 'String' },
    email: {type: 'String', required: true, unique: true},
    phone: {type: 'String', required: true, unique: true },
})


module.exports = mongoose.model('Client', ClientSchema);
