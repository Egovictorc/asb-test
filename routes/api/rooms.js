const express = require("express");
const rooms = require("../../model/rooms");

const router = express.Router();

//////////method GET
//////////desc Get all rooms
//////////api  /api/rooms
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
////////////desc::::: UPDATE/ EDIT ROOM RECORD
//////////// api:::::  /rooms/:description
router.put("/:description", (req, res) => {
  ////////////GET DESCRIPTION OF ROOM TO BE UPDATED
  const { description } = req.params;
///////////GET UPDATED DATA
  const { updatedData } = req.body;
  ///////////////SIMPLE VALIDATION FOR UPDATED DATA
  if(!updatedData) return res.status(400).json({"msg": "'updatedData' key is required from req.body"})

  rooms.findOneAndUpdate({ description }, { $set: updatedData}, {new: true}, (err, room) => {
    if(err) return res.status(500).json(err)
    
    if(!room) return res.status(404).json({"msg": "no room with the given description"})
    return res.status(200).json(room)
  })
})



//////////Method::::: PUT
////////////desc::::: BOOK ROOM
//////////// api:::::  /rooms/book/:description

router.put("/book/:description", (req, res)=> {
  const { guests, nights } = req.body;

  const { description } = req.params;

  //////////SIMPLE VALIDATION
  if(!guests || !nights || !description ) return res.status(400).json({"msg": "incomplete booking details"})

  //////////CHECK IF ROOM EXISTS
  rooms.findOne({ description}, (err, room) => {
    if(err) throw new Error(err)

    //////////IF ROOM DOES NOT EXIST
    if(!room) return res.status(404).json({ "msg": "no room with the given description found"})

    ///////////IF ROOM EXISTS, GET THE NO OF AVAILABLE BEDS
    let {available, cost} = room;
    //////SIMPLE CHECK FOR NUMBER OF AVAILABLE BEDS FOR GUESTS
    if(available >= guests) {

      ///////////GET THE NO OF AVAILABLE BEDS AFTER SUCCESSFULLY BOOKING ROOM
      room.available = available - guests
      room.booked = guests

     return room.save( (err, room)=> {
        if(err) return res.status(500).json(err)
      
        const totalCost = guests * cost;
        return res.status(200).json({ "details for booked room: ":  {...room, totalCost} })

      })
    } 

    return res.status(400).json({"msg": `${available} available beds not enough for ${guests} guests`})
  })
})



//////////////////GET SPECIFIC ROOMS
router.get("/:description", (req, res) => {

  const { description } = req.params;

  rooms.findOne({ description }, (err, room)=> {
    if(err) return res.status(500).json(err)

    if(!room) return res.status(404).json({ "msg": "no room with the given description"})

    return res.status(200).json(room)
  })
})
module.exports = router;
