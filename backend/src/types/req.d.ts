import { UserSchema } from "./schemas";

// req.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: UserSchema; // The user property, which will be set by middleware
    }
  }
}
