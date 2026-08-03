const mongoose = require('mongoose');

const notificatonSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['task','system','reminder'],
        default:'task'
    },
    isread:{
        type:Boolean,
        default:false
    },
    data:{
        type:Object
    },  
}, {timestamps:true})

module.exports = mongoose.model('Notification',notificatonSchema)