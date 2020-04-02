const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const admins = require("../../model/admins");

//api   /api/admins
// method  GET (ALL ADMINS)

router.get("/", (req, res) => {
  
  admins.find({}, (err, data) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });
});


//api   /api/admins
// method  GET (A SPECIFIC ADMIN)
router.get("/login", (req, res) => {
  ///////CHECK IF admins EXISTS ALREADY
  console.log("req body ", req.body);

  const { email, password, name } = req.body;

  //////////FIND ADMIN BY EMAIL
  admins.findOne({ email }, (err, admin) => {
    if (err) return res.status(400).json(err);

    //////RETURN ERROR IF AADMIN DOES NOT EXISTS
    if (!admin) return res.status(404).json({ msg: "no admin record found" });

    /////////////////RETURN DATA IF ADMIN IS REGISTERED
    bcrypt.compare(password, admin.password, (err, admin) => {
      ////////////SERVER ERROR
      if (err) return res.status(501).json({ msg: "server error" });

      //RETURN ADMIN IF VALID CREDENTIALS
      if (admin)
        return res
          .status(200)
          .json({ success: "credentials validated", "logged in as": name });
      ///////RETURN ERROR IF INVALID CREDENTIALS
      return res.status(400).json({ msg: "Invalid credentials" });
    });
  });
});


///////CREATE NEW ADMIN
//api /api/admins/create-admin
//method POST

router.post("/create-admin", (req, res) => {
  const { email, password, name } = req.body;

  const newAdmin = new admins({
    name,
    email,
    password
  });

  //////////CHECK FOR(COMPLETE CREDENTIALS:  NAME, EMAIL and PASSWORD)
  if (!name || !email || !password)
    return res.status(400).json({
      msg: "please enter your name, email and password"
    });

  //////CHECK IF ADMIN EXISTS
  admins.findOne({ email }, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data)
      return res.status(400).json({ msg: "the email given is already taken" });

    ////////////////HASH PASSWORD
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json(err);
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);
        newAdmin.password = hashedPassword;

        newAdmin.save((err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      });
    });
  });
});

module.exports = router;
