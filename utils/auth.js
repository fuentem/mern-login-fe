const jwt = require("jsonwebtoken");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};

exports.validateSignUp = (name, email, password, password_confirmation, contactNo) => {
   let errors = [];
  
   if (!name) {
      errors.push("Name is required");
   }
   if (!email) {
      errors.push("Email is required");
   }
   if (!emailRegexp.test(email)) {
      errors.push("Invalid Email format");
   }
   if (!contactNo) {
      errors.push("Contact No. is required");
   }
   if (!password) {
      errors.push("Password is required");
   }
   if (!password_confirmation) {
      errors.push({
      password_confirmation: "required",
      });
   }
   if (password != password_confirmation) {
      errors.push("Password does not match");
   }

   return errors;
};

exports.validateSignIn = (email, password) => {
   let errors = [];

   if (!email) {
      errors.push("Email is required");
   }
   if (!emailRegexp.test(email)) {
      errors.push("Invalid email format");
   }
   if (!password) {
      errors.push("Password is required");
   }

   return errors;
};

exports.validateOTP = (otp) => {
   let errors = [];

   if (!otp) {
      errors.push("OTP number is required");
   }
   return errors;
};