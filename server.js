const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080
const app = express();
const routes = require('./config/app');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/search', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});