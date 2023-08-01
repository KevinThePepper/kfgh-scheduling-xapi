export interface IAuthConfig {
  /** The JWT signing secret. */
  jwtSecret: string;
  /** The token expiration date. */
  jwtExpiresIn: string;
}
