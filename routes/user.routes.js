const {register, login, getAllUser} = require("../controllers/user.controller");
const express= require("express");
const router=express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/getallusers', getAllUser);

module.exports = router;

