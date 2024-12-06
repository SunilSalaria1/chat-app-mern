const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    parentMessage:{
        type:String,
        required:true,
        min: 6,
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
        required: function() { return !this.isContactEntity; }
    },
    isContactEntity:{
        type:Boolean,
        default: false
    },
    contactName:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null,
        required: function() { return this.isContactEntity;}
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
