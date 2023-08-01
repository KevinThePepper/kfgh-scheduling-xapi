import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const decodedPassword = Buffer.from(password, "base64").toString("utf-8");
    const user = await this.authService.validateUser(username, decodedPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
