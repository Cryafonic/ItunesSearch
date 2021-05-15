const helmet = require('helmet');
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const app = express();

app.use(helmet());

async function fetchingSearchData(term, media) { 
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&&media=${media}&&limit=25`);
    response.then(res => {return res.json()});
//    console.log(data.results[0])
//    return data;
}

router.get("/", (req , res) => {
    const bodyResponse = req.body
    const searchList = fetchingSearchData(bodyResponse.term, bodyResponse.media);
    console.log(searchList);
    res.json(searchList);
});

module.exports = router;