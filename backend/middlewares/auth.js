const jwt = require('jsonwebtoken');
const UnAuthorizedErr = require('../errors/UnAuthorizedErr');

const { JWT_SECRET = 'some-secret-key' } = process.env;

const {
  NeedAuthorizeErrMessage,
} = require('../constants/errorstatuses');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedErr(NeedAuthorizeErrMessage));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnAuthorizedErr(NeedAuthorizeErrMessage));
  }
  req.user = payload;
  next();
};
