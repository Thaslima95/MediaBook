const express = require("express");
const router=express.Router();

const { signup, login,  authMiddleware, loginWithCookie, logout ,addFriend,removeFriend} = require("../controllers/userController");

router.post('/register',signup);
router.post('/login',login);

router.patch('/addFriend',authMiddleware,addFriend);
router.patch('/removeFriend',authMiddleware,removeFriend);

router.get('/login',authMiddleware,loginWithCookie);
router.get('/logout',logout);



router.all('/*',(req,res)=>{
    
    console.log(req.method,req.path);
    res.status(404);
    res.send("Invalid api endpoint");
})

module.exports = router;