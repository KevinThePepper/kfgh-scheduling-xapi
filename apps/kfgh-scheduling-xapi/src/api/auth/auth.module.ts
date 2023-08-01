import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import authConfig, { AuthConfig } from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        const config = AuthConfig();
        return {
          global: true,
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.jwtExpiresIn },
        };
      },
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
