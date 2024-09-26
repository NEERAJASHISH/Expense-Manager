import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Simplified check

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Access denied, token missing or invalid format' });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify the token
    const userToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to req object
    req.user = { userId: userToken.userId }; 

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    // Catch invalid token errors
    return res.status(401).json({ message: 'Access denied, invalid token' });
  }
};

export default authMiddleware;
