const helmet = require('helmet');
const express = require('express');
const router = express.Router();

const app = express();

app.use(helmet());

router.get("/", (req , res) => {
    res.send("This page is working, because you can see me!!");
});

module.exports = router;