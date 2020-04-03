const mongoose = require("mongoose")
const express = require("express");
const config = require("config")

const roomsRouter = require("./routes/api/rooms")
const adminRouter = require("./routes/api/admins")
const errorRouter = require("./routes/api/404")

const app = express();

//use bodyParser middleware
app.use(express.json())

/////// Use rooms route
app.use("/api/rooms", roomsRouter)

/////// Use admin route
app.use("/api/admins", adminRouter)

/////// Use 404 route
app.use("*", errorRouter)

//////////Port
const port = 5000;

///////////DATABASE
const db = config.get("mongoURI")
mongoose.connect(db, { dbName: "asb_test", useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const connection = mongoose.connection;
connection.on("error", () => console.log("error connecting to database"))
connection.once("open", ()=> console.log("successfully connected to database"))

connection.on("connected", ()=> console.log("connected successfully"))

app.get("/", (req, res) => {
  res.send("hello world")
});



app.listen(port, () => console.log(`app listening at http://localhost:${port}`)
)
