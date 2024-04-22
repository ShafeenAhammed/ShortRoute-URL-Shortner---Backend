const shortid = require("shortid");
const urlCollection = require("../models/urlSchema");

module.exports = {
    handleGenerateNewShortURL: async (req,res) =>{
        try{
            const body = req.body;
            if (!body.url) {
                res.status(400).json({ error: "url is required" });
            }
            else{
                const shortID = shortid();
          
                await urlCollection.create({
                  email: body.email,
                  shortId: shortID,
                  redirectURL: body.url,
                  visitHistory: [],
                });
              
                res.json({ id: shortID });
            }
        }
        catch(err){
            console.log("Error in making short url", err);
            
        }
    },

    getOriginalUrl: async (req,res)=>{
        try {
            const shortId = req.params.shortId;
            const entry = await urlCollection.findOneAndUpdate(
              {
                shortId,
              },
              {
                $push: {
                  visitHistory: {
                    timestamp: Date.now(),
                  },
                },
              },
            );
            res.redirect(entry.redirectURL);
        }
        catch(err) {
            console.log("Error in getting original url", err);
        }
    },

    handleGetAnalytics: async (req,res)=>{
        try {
            const shortId = req.params.shortId;
            const result = await urlCollection.findOne({ shortId });
            res.json({
              totalClicks: result.visitHistory.length,
              analytics: result.visitHistory,
            });
        }
        catch(err) {
            console.log("Error in getting analytics",err);
        }
    }
}