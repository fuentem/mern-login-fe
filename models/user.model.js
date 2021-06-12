const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   contactNo: {
      type: String,
      required: true
   }
},{
 timestamps: true,
 collection: 'users'
})

// Middleware executed before save - hash the user's password
userSchema.pre('save', function(next) {
   const self = this;

   // only hash the password if it has been modified (or is new)
   if (!self.isModified('password')) return next();

   // generate a salt
   bcrypt.genSalt(10, function(err, salt) {
       if (err) return next(err);

       // hash the password using our new salt
       bcrypt.hash(self.password, salt, function(err, hash) {
           if (err) return next(err);

           // override the cleartext password with the hashed one
           self.password = hash;
           next();
       });
   });
});

module.exports = User = mongoose.model("user", userSchema);