const express = require("express");
const rooms = require("../../model/rooms");

const router = express.Router();
const room = require("../../src/rooms");

//////////method GET
//////////desc Get all rooms
router.get("/", (req, res) => {

  rooms.find({}, (err, data) => {
    /////////IF ERROR RETURN ERROR
    if (err) throw new Error(err);

    ////////////IF NO AVAILABLE ROOM
    if (!data) res.status(404).json({ msg: "no available room" });
    /////////RETURN ROOMS
    res.status(200).json(data);
  });
});

//////////Method::::: PUT
////////////desc::::: EDIT ROOM
//////////// api:::::  /rooms/:name ROOM
router.put("/:name", (req, res) => {});



//////////Method::::: POST
////////////desc::::: CREATE ROOM
//////////// api:::::  /rooms/create-room ROOM
router.post("/create-room", (req, res) => {
  const { beds, description, gender, cost } = req.body;

  const newRoom = new rooms({
    description,
    beds,
    gender,
    cost
  });
  
  /////////SIMPLE VALIDATION FOR ROOM DETAILS

  if(!beds || !description || !gender || !cost) return res.status(400).json({"msg": "Incomplete room details"})

  ////////SAVE ROOM DETAILS
  newRoom.save((err, data) => {
    if (err) throw new Error(err);
    console.log("body  ", req.body);
    return res.status(200).json(data);
  });
});

module.exports = router;
