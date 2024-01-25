const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');



const login = async (req, res, next) => {
  console.log('hi');
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "User Does not Exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      token,
      user: userWithoutPassword,
      message: "User Authenticated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Login failed' });
  }
};



const register = async (req, res) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(async (doc) => {
      if (doc) {
        return res.status(409).json({ message: "User already Exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          name: name,
          email: email,
          password: hashedPassword,
          registrationDate: req.body.registrationDate,
        });
        console.log(newUser)
        await newUser.save();
        
        const userWithoutPassword = {...newUser.toObject(),password:undefined};


        const token = jwt.sign({userId:newUser._id}, process.env.SECRET_KEY, {
            expiresIn:'1d'
        });




        return res.status(200).json({token, 
            user: userWithoutPassword,
             message: "User Created" });
      }
    })
    .catch((err) => {
      throw err;
    });
};







module.exports = {
  register,
  login,
};