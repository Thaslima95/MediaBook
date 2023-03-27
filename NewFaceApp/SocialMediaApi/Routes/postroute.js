const router=require("express").Router();

const { findById } = require("./Models/Post");
const PostUser=require("./Models/Post")
const Member=require("./Models/Member")


router.post("/",async (req,res)=>{

    const newpost=await new PostUser(
        {
            userId:req.body.userId,
            desc:req.body.desc,
            img:req.body.img
            
        }
    )
    try{
const savedpost=await newpost.save()
res.send("Post has been published")

        
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})

//delete a post

router.delete("/:id",async (req,res)=>{
    const userId=req.body.userId;
    const postUser=await PostUser.findById(req.params.id)
    try
    {
    if(postUser.userId==userId)
    {
        await postUser.deleteOne()
        res.send("Your Post has be deleted successfulyy")
    }
    else{
        res.send("you can delete only your post")
    }
}catch(err)
{
    res.send(err)
}
})

//update apost

router.put("/:id",async (req,res)=>{
    const postUser=await PostUser.findById(req.params.id)
    try{
if(postUser.userId==req.body.userId)
{
await postUser.updateOne({$set:req.body})
res.send("Your post has been updated")
}
else{

    res.send("OOps!You are trying to update someone's post")
}
    }
    catch(err)
    {
        res.send(err)
    }
})

//get a post
router.get("/:id",async (req,res)=>{
const post=await PostUser.findById(req.params.id)
try{
res.json(post)
}
catch(err)
{
res.send(err)
}
})

//like or dislike a post

router.put("/:id/like",async (req,res)=>{
    const post= await PostUser.findById(req.params.id)
    try{

    
    if(!post.likes.includes(req.body.userId))
    {
        await post.updateOne({$push:{likes:req.body.userId}})
        res.send("You've like this post")
    }
    else{
        await post.updateOne({$pull:{likes:req.body.userId}})
        res.send("You've disliked this post")
    }
}catch(err)
{
    res.send(err)
}
})

//get timeline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await Member.findById(req.params.userId);
    const userPosts = await PostUser.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return PostUser.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});


//get user's all post
router.get("/profile/:username",async (req,res)=>{
    try{
        const member=await Member.findOne({username:req.params.username})
       // res.send(member);
        const postuser=await PostUser.find({userId:member._id})
res.send(postuser);

    }catch(err)
    {
        res.status(500).json(err);
    }
})


module.exports=router;