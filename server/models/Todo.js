const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: 'String', required: true },
    description: { type: 'String', required: true },
    status: {
        type: 'String',
        enum: ['In Progress', 'Completed'],
    },
})


module.exports = mongoose.model('Todo', TodoSchema);