const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const app = express();
const responseTime = require("response-time");


app.use(responseTime());

app.use(express.json());

app.use(express.static("./public"));

//main routes
app.use("/", routes );

app.listen(3000, () => {
    console.log("Server on port 3000");
});

