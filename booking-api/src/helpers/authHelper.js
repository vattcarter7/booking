const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export const generateSignedJwtToken = (id) => {
  const token = jwt.sign(
    {
      userId: id
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  return token;
};
