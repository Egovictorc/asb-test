const mongoose = require("mongoose")
const express = require("express");
const config = require("config")

const roomsRouter = require("./routes/api/rooms")
const adminRouter = require("./routes/api/admins")

const app = express();

//use bodyParser middleware
app.use(express.json())

/////// Use rooms route
app.use("/api/rooms", roomsRouter)

/////// Use rooms route
app.use("/api/admin", adminRouter)

//////////Port
const port = 5000;

///////////DATABASE
const db = config.get("mongoURI")

mongoose.connect(db, { dbName: "hotel", useNewUrlParser: true, useUnifiedTopology: true})

app.get("/", (req, res) => {
  res.send("hello world")
});



app.listen(port, () => console.log(`app listening at http://localhost:${port}`)
)
