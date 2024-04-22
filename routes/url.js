const express= require("express");
const url = require("../controller/url");
const urlRoute = express();

urlRoute.post("/", url.handleGenerateNewShortURL);

urlRoute.get("/:shortId", url.getOriginalUrl);

urlRoute.get("/analytics/:shortId", url.handleGetAnalytics);

module.exports = urlRoute;