const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    
      email: {
        type: String,
        required: true,
        unique: true,
      },
    
      password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
      },
      todo: [
        {
          title: "String",
          description: "String",
          completed: Boolean,
          createdAt: Date,
        },
      ],
      verified: {
        type: Boolean,
        default: false,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
     
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;