const mongoose=require("mongoose");

const memberSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
type:String,
default:""
    },
    profileCoverImg:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]

    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
   city:{
    type:String,
    min:10
   },
   from:{
type:String,
min:10
   },
   relationship:{
      type: Number,
      enum: [1, 2, 3],
   }
    
},{timestamps:true})

module.exports=mongoose.model("Member",memberSchema)