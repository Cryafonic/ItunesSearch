let app = require("../config/app");
const chai = require("chai");
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// testing status of get method.
chai.request(app)
    .get("/search/results")
    .end((err, res) => {
        if(err) {
            return console.log(err)
        }else {
            chai.assert.equal(res.status, 200, "Response was not OK");
            console.log("Get status Ok");
        }
    })
