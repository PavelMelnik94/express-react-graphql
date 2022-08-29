const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: 'String', required: true, trim: true, minLength: 2  },
    email: { type: 'String', required: true, unique: true, trim: true, minLength: 6  },
    phone: { type: 'String', required: true, unique: true },
})


module.exports = mongoose.model('User', UserSchema);
