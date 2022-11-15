import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;       //Need hotelId for relationship
  const newRoom = new Room(req.body);     

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      }); //PUSH DATA IN MONGO DB
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //SET DATA IN MONGO DB
      },
      { new: true } //console.log updated one not the previous
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      }); //DELETE DATA IN MONGO DB
    } catch (error) {
      next(error);
    }

    res.status(200).json("Deleted 1 room.");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    //Only update RoomNumber in 1 Room -> Update One 
    await Room.updateOne({"roomNumbers._id": req.params.idRoomNumber}, {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates            //New syntax
      }
    })
    res.status(200).json("Updated unavailable Dates to Room");
  } catch (error) {
    next(error);
  }
};
