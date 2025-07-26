import { verifyToken, getTokenFromHeader } from "./auth";
import { apiError } from "./api";

export const authenticateUser = async (req) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  return decoded;
};

export const requireAuth = (handler) => {
  return async (req) => {
    try {
      const user = await authenticateUser(req);
      req.user = user;
      return handler(req);
    } catch (error) {
      return apiError(req, 401, "Authentication required");
    }
  };
};

export const requireAdmin = (handler) => {
  return async (req) => {
    try {
      const user = await authenticateUser(req);

      if (user.role !== "ADMIN") {
        return apiError(req, 403, "Admin access required");
      }

      req.user = user;
      return handler(req);
    } catch (error) {
      return apiError(req, 401, "Authentication required");
    }
  };
};
