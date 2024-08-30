const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();

require("dotenv").config();

const roomRoute = require("./routes/room.routes");
const userRoute = require("./routes/user.routes");
const bookingRoute = require("./routes/booking.routes");


app.use(cors());

app.use(express.json());
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);

const port= process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(()=> {
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`);
    })
}).catch(error=> {
    console.log('Error connecting while database');
})
