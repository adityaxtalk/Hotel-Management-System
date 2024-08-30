const Room = require("../models/room.model");

exports.getAllRooms= async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch(error) {
        return res.status(400).json({message: error});
    }
}

exports.getRoomById = async (req, res) => {
    const roomId = req.params.roomId;
    try {
       const room = await Room.findOne({_id: roomId});
       return res.send(room);
    } catch (error) {
        return res.status(400).json({message: error});
    }
}

exports.addRoom = async (req, res) => {
    try {
      const newRoom = await Room(req.body);
      await newRoom.save();
      return res.send("New Room has been added successfully");
    } catch (error) {
        return res.status(400).json({error});
    }
}