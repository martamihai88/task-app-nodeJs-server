const User = require('../models/user');
const bcrypt = require('bcrypt'); //encrypt password
const jwt = require('jsonwebtoken'); //generate token

//user signup
exports.user_signup = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      // if user exists or not
      if(user.length >= 1){
        return res.status(409).json({
          message: "Email already exists"
        }) 
      } else {
        //create user and hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err){
            console.log(err)
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              email: req.body.email,
              password:  hash
              })
              user.save()
                .then((result => {
                  console.log(result)
                  res.status(201).json({
                    message: 'User created'
                  })
                }))
                .catch(err => {
                  console.log(err)
                  res.status(500).json({
                    error: err
                  })
                });
            }
        });  
      }
    })
}

// user login 
exports.user_login = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(result => {
      // if user exists
      if(result.length < 1){
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      //compare passwords
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if(err){
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if(response){
          //create token with jwt
          const token = jwt.sign({
            email: result[0].email,
            id: result[0]._id
          }, 
            "secret",
            {
              expiresIn: "1h"
            }
          )
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            email: req.body.email
          })
        }
        res.status(401).json({
          message: 'Auth failed'
        })
      }) 
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

// delete user
exports.user_delete = (req, res, next) => {
  User.deleteOne({_id: req.params.userID})
  .exec()
  .then( result => {
    res.status(200).json({
      message: "User deleted"
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
}

// delete all users
exports.user_delete_all = (req, res, next) => {
  User.deleteMany({})
  .exec()
  .then( result => {
    res.status(200).json({
      message: "All users deleted"
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
}