import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Version } from "@app/common";
import { Public } from "./auth.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@ApiTags("Authentication")
@UseInterceptors(ClassSerializerInterceptor)
@Public()
@Controller({
  path: "auth",
  version: [Version.v202201],
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully logged in",
  })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
