import jwt from 'jsonwebtoken';

//function to generate an access token
export const generateAccessToken = (userId, name, role, email) => {
    return jwt.sign({userId, name, role, email}, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

  //function to generate a refresh token
export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  };