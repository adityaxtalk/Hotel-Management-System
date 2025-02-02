const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    txnId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "booked"
    },
}, {
    timestamps: true
});

const bookingmodal = mongoose.model("Booking", bookingSchema);

module.exports = bookingmodal;