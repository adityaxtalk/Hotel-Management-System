const express=require("express");
const {getAllRooms, getRoomById, addRoom} = require("../controllers/room.controller")
const router=express.Router();

router.get("/getallrooms", getAllRooms);
router.get("/getRoomById/:roomId", getRoomById);
router.post('/addRoom', addRoom);

module.exports = router;