import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RolesService } from "./roles.service";
import { ApiPaginatedResponse, PageOptionsDto, Version } from "@app/common";
import { Role } from "./entities/role.entity";

@ApiBearerAuth()
@ApiTags("Roles")
@UseInterceptors(ClassSerializerInterceptor)
@Controller({
  path: "roles",
  version: [Version.v202201],
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a role",
    description: "Creates a new role",
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a paginated list of roles",
    description: "Gets a paginated list of roles",
  })
  @ApiPaginatedResponse(Role, "Successfully received roles list")
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.rolesService.findAll(pageOptionsDto);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a role",
    description: "Gets a role given an ID or slug",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "The role with the ID or slug could not be found",
  })
  findOne(@Param("id") id: string | number) {
    return this.rolesService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update a role",
    description: "Updates a role given an ID or slug",
  })
  update(
    @Param("id") id: string | number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete a role",
    description: "Deletes a user given an ID or slug",
  })
  remove(@Param("id") id: string | number) {
    return this.rolesService.remove(id);
  }
}
