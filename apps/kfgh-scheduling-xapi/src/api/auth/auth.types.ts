export enum Privileges {
  USER_READ = "user:read",
  USER_CREATE = "user:created",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",
  ROLE_READ = "role:read",
  ROLE_CREATE = "role:create",
  ROLE_UPDATE = "role:update",
  ROLE_DELETE = "role:delete",
}

export const privileges = Object.values(Privileges);

/** Represents a privilege to a resource. */
export type Privilege = `${Privileges}`;

export interface JwtPayload {
  /** Synonymous with the user's ID. */
  sub: number;

  /** The user's username. */
  username: string;

  /** Roles assigned to the user. */
  roles: Privilege[];
}

export interface JwtLoginPayload {
  token: string;
}
