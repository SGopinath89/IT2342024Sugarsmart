const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "1234!@#%<{*&)");
      //req.user = decoded;
      req.user = { id: decoded.userId };
      next();
  } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
  }
};