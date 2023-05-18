const User = require('../models/user');

module.exports.addTask = async (req, res) => {
    try {
      const { title } = req.body;
  
      const user = await User.findById(req.user._id);
  
      user.todo.push({
        title,
        completed: false,
        createdAt: new Date(Date.now()),
      });
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Task added successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

module.exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ 
             success: false,
             message: "User already exists" 
            });
       }
      user = await User.create({
        name,
        email,
        password
      });
      res
        .status(200).json({
             success: true,
             message: "Registered successfully" 
            });
    } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
        });
    }
};
module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false,
             message: "Please enter all fields" 
            });
      }
  
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        return res
          .status(400)
          .json({ success: false,
             message: "Invalid Email or Password" 
            });
      }
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false,
             message: "Invalid Email or Password" 
            });
      }
      res.status(200).json({
        message: "Login Successfull", user: user
        });
    } catch (error) {
      res.status(500).json({ 
        success: false, message: error.message 
    });
    }
};
  

  