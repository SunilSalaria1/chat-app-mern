const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    parentMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    message: {
        type: String,
        min: 6,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        default:null,
    },
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
