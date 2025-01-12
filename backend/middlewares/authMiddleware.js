import jwt from "jsonwebtoken";

export async function authenticateUser(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(400).json({
        message: "Token not provided",
      });
    }

    // Verify the token
    jwt.verify(token, "000000", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token",
        });
      }

      req.user = decoded;

      // Move to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
