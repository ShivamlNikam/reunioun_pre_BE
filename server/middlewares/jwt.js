const jwt = require('jsonwebtoken');
const secret = 'key';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(402).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
};

module.exports = verifyToken;