import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiPaginatedResponse, PageOptionsDto, Version } from "@app/common";
import { User } from "./entities/user.entity";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Users")
@UseInterceptors(ClassSerializerInterceptor)
@Controller({
  path: "users",
  version: [Version.v202201],
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a user",
    description: "Creates a new user",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a paginated list of users",
    description: "Gets a paginated list of users",
  })
  @ApiPaginatedResponse(User, "Successfully received users list")
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.usersService.findAll(pageOptionsDto);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a user",
    description: "Gets a user given an ID",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "The user with the ID could not be found",
  })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update a user",
    description: "Updates a user given an ID",
  })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete a user",
    description: "Deletes a user given an ID",
  })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
