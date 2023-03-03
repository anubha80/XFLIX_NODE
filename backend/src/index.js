const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.connect(config.db_url).then(()=>{
  console.log(" ~~~~~ Connected to DB ~~~~~ ");
  app.listen(config.port, () => {
    console.log(` ~~~~~ App listening on port ${config.port}! ~~~~~`);
  });
})
