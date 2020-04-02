const express = require("express");
const rooms = require("../../model/rooms");

const router = express.Router();

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
//router.put("/:name", (req, res) => {});



//////////Method::::: POST
////////////desc::::: CREATE ROOM
//////////// api:::::  /rooms/create-room ROOM
router.post("/create-room", (req, res) => {
  const { beds, description, gender, cost, available } = req.body;

  const newRoom = new rooms({
    description,
    beds,
    gender,
    cost, available
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



//////////Method::::: PUT
////////////desc::::: BOOK ROOM
//////////// api:::::  /rooms/book/:description

router.put("/:description", (req, res)=> {
  const { guests, nights } = req.body;

  const { description } = req.params;

  //////////SIMPLE VALIDATION
  if(!guests || !nights || !description ) return res.status(400).json({"msg": "incomplete booking details"})

  //////////CHECK IF ROOM EXISTS
  rooms.findOne({ description}, (err, data) => {
    if(err) throw new Error(err)

    //////////IF ROOM DOES NOT EXIST
    if(!data) return res.status(404).json({ "msg": "no room with the given description found"})

    ///////////IF ROOM EXISTS
    const {available } = data;
    return res.status(200).json(data)
  })
})

module.exports = router;
