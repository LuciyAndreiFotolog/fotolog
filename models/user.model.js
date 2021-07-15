const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
{
  email: {
    type: String,
    required: [true, "Email is required"], 
    trim: true,
    unique: true,
    lowercase: true, 
    match: [EMAIL_PATTERN, "Email must have a valid format"]
  },
  username: {
    type: String,
    unique: true,
    required: false
  },
  password : {
    type: String, 
    required: [true, "Password is required"],
    minLength: [8, 'Password must be at least 8 characters long']
  },
  image: {
    type: String 
  }, 
  googleID: {
    type: String
  },
  facebookID: {
    type: String
  }, 
  description: {
    type: String, 
  }
  // active: {
  //   type: Boolean, 
  //   default: false
  // },
  // activationToken: {
  //   type: String, 
  //   default: () => {
  //     return Math.random().toString(36).substring(7) +
  //     Math.random().toString(36).substring(7) +
  //     Math.random().toString(36).substring(7) +
  //     Math.random().toString(36).substring(7)
  //   }
  // },
  // role: {
  //   type: String, 
  //   enum: ['ADMIN', 'USER'], 
  //   default: 'USER'
  // }
},
{
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (this.email === process.env.ADMIN_EMAIL) {
    this.role = 'ADMIN'
    this.active = true
  } else {
    this.role = 'USER'
  }

  if (this.isModified('password')) {
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then((hash) =>{
        this.password = hash
        next()
      })
  } else {
    next()
  }
});

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;