import { compareSync, hashSync } from "bcrypt";

/**
 * Hashes a password.
 *
 * @param password The plain-text password.
 * @param saltOrRounds The salt to be used to hash the password.
 * @returns The hashed password.
 */
export const hashPassword = (password: string, saltOrRounds = 10) => {
  return hashSync(password, saltOrRounds);
};

/**
 * Compares a plain-text password to a hashed password to see if they match.
 * @param plainPassword The plain-text password to check.
 * @param encryptedPassword The encrypted password to compare to.
 * @returns Whether the passwords match.
 */
export const passwordsMatch = (
  plainPassword: string,
  encryptedPassword: string,
) => {
  return compareSync(plainPassword, encryptedPassword);
};
