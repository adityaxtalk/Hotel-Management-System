const Booking = require("../models/booking.model");
const Room= require("../models/room.model");
const {v4: uuidv4} = require("uuid");
require('dotenv').config();
const stripe= require('stripe')(process.env.STRIPE_KEY)

exports.getAllBookings = async (req, res) => {
    try {
        const booking = await Booking.find();
        return res.send(booking);
    } catch(error) {
        return res.status(400).json({error});
    }
}

exports.cancelBooking = async (req, res) => {
    const {bookingId, roomId} = req.body;

    try {
       const bookingItem = await Booking.findOne({_id: bookingId});
       bookingItem.status = "cancelled";
       await bookingItem.save();
       const room = await Room.findOne({_id: roomId});
       const bookings=room.currentBookings;
       const temp=bookings.filter(booking=> booking.bookingid.toString() !== bookingId);
       room.currentBookings=temp;
       await room.save();
       return res.send("Your booking cancelled successfully");
    } catch (error) {
        return res.status(404).json({error});
    }
}

exports.getBookingByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const bookings=await Booking.find({userId: userId});
        return res.send(bookings);
    } catch(error) {
        return res.status(400).json({error});
    }
}

exports.bookRoom = async (req, res) => {
    const {
        room, userId, checkIn, checkOut, amount, days, token
    } = req.body;

    try {
      
    //   const customer = await stripe.customers.create({
    //     email: token.email, source: token.id
    //   });

    //   const payment= await stripe.charges.create(
    //     {
    //         amount: amount * 100,
    //         customer: customer.id,
    //         currency: "INR",
    //         receipt_email: token.email
    //     },
    //     { idempotenceyKey: uuidv4() }
    //   )

      if (true) {
        const newbooking = new Booking({
            room: room.name,
            roomId: room._id,
            userId,
            checkIn,
            checkOut,
            amount,
            days,
            txnId: "1234"
          });
          const booking = await newbooking.save();
          const roomtemp = await Room.findOne({_id: room._id});
          roomtemp.currentBookings.push({bookingid:booking._id, checkIn,checkOut,userId, status:booking.status});
          await roomtemp.save();
      }      
      return res.send("Payment successful!, Your room is Booked!");
    } catch(error) {
        console.log(error);
        return res.status(400).json({message: error});
    }
}