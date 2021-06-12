const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const {
   createJWT, validateSignUp, validateSignIn, validateOTP
} = require("../utils/auth");

exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation, contactNo } = req.body;
  
  let errors = validateSignUp(name, email, password, password_confirmation, contactNo);

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({email: email})
  .then(user=>{
      if(user){
        return res.status(422).json({ errors: ["Email already exists"] });
     
      }else {   
        const user = new User({
          name: name,
          email: email,
          password: password,
          contactNo: contactNo
        });
        
        user.save()
        .then(response => {
          res.status(200).json({
              success: true,
              result: response
          })
        })
        .catch(err => {
          res.status(500).json({
              errors: [{ error: err }]
          });
        });
    }

  }).catch(err =>{
      res.status(500).json({
        errors: ['Something went wrong']
      });
  })
}

exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = validateSignIn(email, password);

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
      });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json({ errors: ["Password is incorrect"] 
          });
        }
        
        client.verify.services(req.app.locals.twilio_service_sid)
        .verifications.create({to: user.contactNo, channel: 'sms'})
        .then(verification => {
          if(verification.status == 'pending'){
            return res.status(200).json({
              success: true,
              email: email,
              message: 'OTP successfully sent to user.'
            });
          }
        }).catch(err => {
          res.status(500).json({ erros: err });
        });

      }).catch(err => {
        res.status(500).json({ erros: err });
      });
    }
  }).catch(err => {
    res.status(500).json({ erros: err });
  });
}


exports.verifyOTP = (req, res) => {
  let { email, otp } = req.body;
  let errors = validateOTP(otp);

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({errors: ["User not found"],});
    } else {
      
      let access_token = createJWT(
        user.email,
        user._id,
        3600
      );
      
      client.verify.services(req.app.locals.twilio_service_sid)
      .verificationChecks.create({to: user.contactNo, code: otp})
      .then(verification_check => {

        if(verification_check.status == 'approved'){
          jwt.verify(access_token, process.env.TOKEN_SECRET, (err,decoded) => {
            if (err) {
              res.status(500).json({ erros: err });
            }
            if (decoded) {
                return res.status(200).json({
                  success: true,
                  token: access_token,
                  message: user
                });
              }
          });
        }else{
          return res.status(400).json({ errors: ["OTP incorrect"]});
        }

      })
      .catch(err => {
        res.status(500).json({ erros: err });
      });
    }
    
  }).catch(err => {
    res.status(500).json({ erros: err });
  });

};