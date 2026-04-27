const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EBSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        type :String,
        set : (v)=> v==="" ? "https://i.pinimg.com/originals/87/ae/83/87ae8360cfe56fda3b49e609eb3b7c25.jpg" : v,

    },
    city:{
        type: String,
        required: true
    },
    locIcon : String, 
    timing:String
    
})

const EB = mongoose.model("EB",EBSchema);
module.exports = EB;
