const {bookRoom, getAllBookings, getBookingByUserId, cancelBooking} = require("../controllers/booking.controller");
const router=require("express").Router();


router.post('/bookroom', bookRoom);
router.get("/getallbookings", getAllBookings);
router.get("/getbookingsbyuserid/:userId", getBookingByUserId);
router.post("/cancelbooking", cancelBooking);

module.exports = router;