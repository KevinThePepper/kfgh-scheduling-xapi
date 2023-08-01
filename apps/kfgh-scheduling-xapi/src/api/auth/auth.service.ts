import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { passwordsMatch } from "./auth.util";
import { User } from "../users/entities/user.entity";
import { PropertiesOf } from "@app/types";

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
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<PropertiesOf<User>, "password">): Promise<any> {
    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
