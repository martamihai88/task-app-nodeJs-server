const jwt = require('jsonwebtoken');

//check for auth
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : req.body.token
    const decoded = jwt.verify(token, "secret"); 
    req.userData =  decoded;
    next(); 
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
}