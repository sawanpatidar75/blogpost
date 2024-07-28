const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      next()
    }
    this.password = await bcrypt.hash(this.password,10)
  })

  userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
  }

module.exports = mongoose.model('users', userSchema);