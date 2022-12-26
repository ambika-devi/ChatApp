const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const User = require("../models/user");
const saltRounds = 10;

const generateJWT = (obj) => {
  return jwt.sign(obj, 'secretkey');
};
exports.postRegister = (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !email || !phone || !password || phone.length != 10) {
    return res
      .status(400)
      .send({ msg: "Fill the details correctly!" });
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {     //to hash a password
    try {
      if (err) {
        throw new Error();
      }
      const response = await User.create({
        name,
        phone,
        email,
        password: hash,
      });
      // console.log(response);
      res.status(201).send({ msg: "New user successfully registered!" });
    } catch (error) {
      console.log(err);
      res.status(400).send({ msg: "User Already exists! try login" });
    }
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    return res
      .status(400)
      .send({ msg: "Fill the details correctly!" });
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    // console.log(result);//null or data values
    if (!user) {
      return res.status(404).send({ msg: "User not found. Please signup!" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {   //to verify plain text password with hashed password
        // result == true
        if (err) {
          //  throw new Error("Internal server error")
          return res.status(500).send({ msg: "Internal server error!" });
        }
        if (result) {
          return res.status(200).send({
            msg: "User Login Successfully!",
            token: generateJWT({
              userId: user.id,
              name: user.name,
            }),
          });
        } else {
          return res.status(401).send({ msg: "Password Incorrect!" });
        }
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({ msg: "Internal server error!" });
  }
};