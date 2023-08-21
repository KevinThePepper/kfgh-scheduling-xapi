import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { passwordsMatch } from "./auth.util";
import { User } from "../users/entities/user.entity";
import { PropertiesOf } from "@app/types";
import { JwtLoginPayload, JwtPayload, Privilege } from "./auth.types";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<PropertiesOf<User>, "password">> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user && passwordsMatch(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: Omit<PropertiesOf<User>, "password">,
  ): Promise<JwtLoginPayload> {
    // add privileges assigned to this user
    const privileges: Privilege[] = [];
    if (user.roles && user.roles.length > 0) {
      privileges.push(
        ...user.roles.reduce<Privilege[]>((roles, role) => {
          return roles.concat(...role.privileges);
        }, []),
      );
    }

    if (user.privileges && user.privileges.length > 0) {
      privileges.push(...user.privileges);
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
      roles: privileges,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
