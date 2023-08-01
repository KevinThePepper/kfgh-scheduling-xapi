import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import authConfig, { AuthConfig } from "./auth.config";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        LocalStrategy,
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useClass: mockRepository,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
