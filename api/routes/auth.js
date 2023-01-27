const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4 : uuidv4 } = require('uuid');

//REGISTER
router.post("/register", async (req, res) => {
  try {
    
    const tryUser = await User.findOne({ username: req.body.username });
    if(tryUser.data !== null ) return res.status(400).json("User already exist!");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const tempId = uuidv4();
    const newUser = new User({
      username: req.body.username,
      userCategory: req.body.userCategory,
      email: req.body.email,
      password: hashedPass,
      id: tempId
    });

    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if( user ){
      const validated = await bcrypt.compare(req.body.password, user.password);
      if( validated === true ){
        const { password, ...others } = user._doc;
        return res.status(200).json(others);

      }
      else{
        return res.status(400).json("Wrong Password!");
      }
    }
    else{
      return res.status(400).json("User does not exist!");
    }


  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
