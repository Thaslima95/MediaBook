const router=require("express").Router();
const Member=require("./Models/Member")
const bcrypt=require("bcrypt")





//update

router.put("/:id",async (req,res)=>{
    try{
    const userId=req.body.userId;
    if(userId===req.params.id || req.body.isAdmin)
    {
        if(req.body.password)
        {
            try{
                const salt=await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt)
                res.send("Your password has been updated succesfully")

            }catch(err)
            {
res.send(err)
            }
        }
const updatemember=await Member.findByIdAndUpdate(userId,{$set:req.body})
res.send("Your profile has been updated successfully")
    }
    else{
        res.send("Oops! you are trying to update someone's account")
    }
}catch(err)
{
    res.send("Oops! you are trying to update someone's account")
}
})

//Delete a user

router.delete("/:id",async (req,res)=>{
    try{
const id=req.body.userId;
if(id===req.params.id)
{
    const deleted=await Member.findByIdAndDelete(req.params.id)
    res.send("Your account has been deleted successfully!")
}
else{
    res.send("you can delete your account only")
}
    }catch(err)
    {
        res.send("you cannot delete someone account")
    }
})

router.get("/",async (req,res)=>{
    try{
       const userId=req.query.userId;
        const username=req.query.username;
        console.log("failed Here")
        const user= userId   ? await Member.findById(userId) : username ? await Member.findOne({username:username}) : " "
 const {password,updatedAt,...objs}=user._doc;
    !user && res.send("User Not found")
    res.status(200).send(objs)
    }
    catch(err)
    {res.json(err)

    }
})

//get friends list
router.get("/friends/:userId",async (req,res)=>{
    try{
        const user= await Member.findById(req.params.userId);
        const friends=await Promise.all(user.following.map((friendId)=>{
            return Member.findById(friendId)
        })
        )
        let friendList=[];
        friends.map((friend)=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture})
        })
        res.status(200).json(friendList)

    }
    catch(err)
    {
        console.log(err)
    }
})



module.exports=router;
