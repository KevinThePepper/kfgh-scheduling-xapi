import { IsStrongPassword } from "class-validator";
import { SetMetadata } from "@nestjs/common";
import { Privilege } from "./auth.types";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** Sets roles for this endpoint/resource. */
export const Roles = (...roles: Privilege[]) => SetMetadata("roles", roles);

/**
 * A property decorator for validating a string password.
 */
export const IsAppStrongPassword = () =>
  IsStrongPassword(
    { minUppercase: 0, minSymbols: 0 },
    {
      message:
        "Password must be at least 8 characters long and contain 1 number",
    },
  );
