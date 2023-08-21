import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { slugify } from "@app/lib";
import { PageOptionsDto, paginate } from "@app/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name, slug, privileges } = createRoleDto;
    if (!slug) createRoleDto.slug = slugify(name);
    if (privileges)
      createRoleDto.privileges = Array.from(new Set(createRoleDto.privileges));
    const role: Role = await this.rolesRepo.save(createRoleDto);
    return role;
  }

  async findAll(pageOptions: PageOptionsDto) {
    return paginate(this.rolesRepo.createQueryBuilder(), pageOptions);
  }

  async findOne(slugOrId: string | number) {
    const { field, filter } = this.getFilter(slugOrId);
    const role = await this.rolesRepo.findOne({ where: filter });

    if (!role) throw new NotFoundException(`Role by ${field} not found`);
    return role;
  }

  async update(slugOrId: string | number, updateRoleDto: UpdateRoleDto) {
    const { field, filter } = this.getFilter(slugOrId);

    const existingRole = await this.findOne(slugOrId);

    if (!existingRole) {
      throw new NotFoundException(`Role by ${field} not found`);
    }

    // append to existing privileges if existing roles exist
    if (existingRole.privileges && updateRoleDto.privileges) {
      updateRoleDto.privileges = Array.from(
        new Set([
          ...(existingRole.privileges || []),
          ...updateRoleDto.privileges,
        ]),
      );
    }
    await this.rolesRepo.update(filter, updateRoleDto);
    return await this.findOne(slugOrId);
  }

  async remove(slugOrId: string | number) {
    const { field, filter } = this.getFilter(slugOrId);
    const deleted = await this.rolesRepo.delete(filter);

    if (deleted.affected !== 1) {
      throw new NotFoundException(`Role by ${field} not found`);
    }

    return { ...filter, success: true };
  }

  private getFilter(slugOrId: string | number) {
    const field = Number.isNaN(Number(slugOrId)) ? "slug" : "id";
    return {
      field,
      filter: { [field]: slugOrId },
    };
  }
}
