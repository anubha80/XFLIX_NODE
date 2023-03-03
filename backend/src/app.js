const express = require("express");
const routes = require("./routes/v1");
const app = express();



app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res) => {
    res.status(404).json({message:"unknown api requst"});
});

module.exports = app;