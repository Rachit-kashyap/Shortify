const express = require("express");
const Link = require("./Database/link-model"); 
const db = require("./Database/db");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT||8000;

app.use(cors({ origin: "*", credentials: true , methods:["post","get"]}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




function generateRandomString() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 3) + 6; // Random length between 6 and 8
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

app.post("/api/v1/short-url", async (req, res) => {
  try {

    let link = req.body.url;
    if(!link)
    {
      return res.status(400).json({success:false,message:"enter a linnk"})
    }
    let newUrlgenerate = generateRandomString();

    let isexist = await Link.findOne({ newUrl: newUrlgenerate });
    while (isexist) {
      newUrlgenerate = generateRandomString();
      isexist = await Link.findOne({ newUrl: newUrlgenerate }); // ✅ correct
    }
    


 

    let saveUrl = new Link({
      url: link,
      newUrl: newUrlgenerate,
    });

    await saveUrl.save();

    res.status(201).json({ success: true, shortenedUrl: newUrlgenerate });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});




app.get("/api/v1/:url",async(req,res)=>{
let existUrl = await Link.findOne({newUrl : req.params.url});
if(existUrl)
{
    return res.status(200).redirect(`${existUrl.url}`);
}
return res.status(400).json({
    success:false,
    message:"invalid url",

})
})




app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
