const User = require("../models/user.model");
const userController = {};


userController.register = async (req, res, next) => {
  const { name, email, password, joined } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    joined
  });

  try {
      const user = await newUser.save();
      return res.send({ user });
  }catch(e) {
      if (e.code === 11000 && e.name === 'MongoError') {
          const error = new Error(`Email address ${newUser.email} is already taken`);
          error.status = 400
          next(error);
      }else {
          next(e);
      }
      
  }

};


userController.login = async (req, res, next) => {
  //Username, password in request
  const { email, password } = req.body;
  try {
      //Retrieve user information
      const user = await User.findOne({ email });
      if (!user) {
          const err = new Error(`The email ${email} was not found on our system`);
          err.status = 401;
          return next(err);
      }

      //Check the password
      user.isPasswordMatch(password, user.password, (err, matched) => {
          if (matched) { //Generate JWT
              return res.send({'message':'login binaja7'})
          }

          res.status(401).send({
              error: 'Invalid username/password combination'
          });
      });

  }catch(e){
      next(e);
  }
  
};




module.exports = userController;