const express=require("express")
const app=express();
const port=8500;
const userrouter=require("./Routes/userroutes")
const authrouter=require("./Routes/authenticateroute")
const postrouter=require("./Routes/postroute")


const errorController = require("./controllers/errorController")
const multer=require("multer")



const mongoose=require("mongoose")
const dotenv=require("dotenv")
const morgan=require("morgan")
const cors = require("cors");
const helmet=require("helmet")
const path=require("path")
const cookieParser = require("cookie-parser");
dotenv.config();

mongoose.connect("mongodb+srv://admin:aafiya@cluster0.nomsigp.mongodb.net/?retryWrites=true&w=majority");
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"))



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

 const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("uploaded success")
    }
        catch(err)
        {
            console.log(err)
        }
    
})

app.use("/api/users",userrouter)
app.use("/api/auth",authrouter)
app.use("/api/posts",postrouter)


app.listen(port,()=>{
    console.log("Backend Sever")
})