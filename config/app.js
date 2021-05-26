const helmet = require('helmet');
const express = require('express');
// const router = express.Router();
const fs = require("fs");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8080

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(helmet());

async function fetchingSearchData(term, media) { 
    const URL = `https://itunes.apple.com/search?term=${term}&&media=${media}&&limit=30`;
    try{
        const response = await fetch(URL).then(res => res.json());
        return response;
    }catch(err) {
        return err
    }
}

app.get("/search/results", (req, res)=> {
    fs.readFile('itunesResponse.json', (err, data) => {
        if (err) res.send("file not found.");
        else 
            res.send(`${data}`);
    });
});

app.post("/search/", (req , res) => {
    const bodyResponse = req.body
    console.log(bodyResponse);
    fetchingSearchData(encodeURI(bodyResponse.input), bodyResponse.select)
        .then(res => {
            const uniqueRes = Array.from(new Set(res.results.map(a => a.artistId))).map(id => {return res.results.find(a => a.artistId === id)})
            fs.writeFile('itunesResponse.json', JSON.stringify(uniqueRes), (err) => {
                if (err) return console.log(err);
            });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;