import { registerAs } from "@nestjs/config";
import { IAuthConfig } from "./types";

export const AuthConfig = (): IAuthConfig => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRATION ?? "7d",
});

export default registerAs<IAuthConfig>("auth", () => AuthConfig());
