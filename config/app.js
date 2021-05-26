const helmet = require('helmet');
const express = require('express');
const fs = require("fs");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8080;
// initializes express in app.
const app = express();

// accetps the data sent from body and also secures the app by using helmet.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// fetch that handles the call to the api end-point
async function fetchingSearchData(term, media) { 
    const URL = `https://itunes.apple.com/search?term=${term}&&media=${media}&&limit=30`;
    try{
        const response = await fetch(URL).then(res => res.json());
        return response;
    }catch(err) {
        return err
    }
}

//handles the get method for the data that is in itunesReponse.json
app.get("/search/results", (req, res)=> {
    fs.readFile('itunesResponse.json', (err, data) => {
        if (err) res.send("file not found.");
        else 
            res.send(`${data}`);
    });
});

// takes information form the body then call the data to be placed in the file call itunesRepsonse.json.
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

// start the server on port 8080 if there is no env specificed.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (process.env.NODE_ENV === 'production'){
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
            'client', 'build','index.html'));
        });
    }
});

module.exports = app;