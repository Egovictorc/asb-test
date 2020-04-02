const express = require("express")

const router = express.Router()


router.use("/", (req, res)=> {
    res.status(404).json({"msg": "path does not exist"})
})

module.exports = router;