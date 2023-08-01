import { IsStrongPassword } from "class-validator";
import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

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
