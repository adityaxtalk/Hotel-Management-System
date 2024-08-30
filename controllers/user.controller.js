const User = require("../models/user.model");

exports.register = async (req, res) => {
    const {name, email, password, isAdmin} = req.body;
    const newUser = new User({name, email, password, isAdmin});
    try {
        const user = await newUser.save();
        res.send('User registered successfully');
    }
    catch (error) {
        return res.status(400).json({error});
    }
}


exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email, password});
        if (user) {
            const temp= {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            return res.send(temp);
        } else {
            return res.status(404).json({message: "Login failed"});
        }
    } catch (error) {
        return res.status(404).json({error});
    }
}

exports.getAllUser = async (req, res) => {
   try {
    const users =await User.find({});
    return res.send(users);
   } catch(error) {
    return res.status(400).json({error})
   }
}