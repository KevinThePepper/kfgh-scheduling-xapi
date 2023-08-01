import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PageOptionsDto, paginate } from "@app/common";
import { hashPassword } from "../auth";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // compare password 1 and 2
    const { password1, password2, ...dto } = createUserDto;

    if (password1 !== password2)
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        code: "PASSWORD_MISMATCH",
        message: "Passwords do not match",
      });

    const saved = await this.usersRepo.save({
      ...dto,
      password: hashPassword(password1),
    });

    const createdUser = await this.findOne(saved.id);
    return createdUser;
  }

  async findAll(pageOptions: PageOptionsDto) {
    return paginate(this.usersRepo.createQueryBuilder(), pageOptions);
  }

  async findOne(id: number | FindOneOptions<User>) {
    const user = await this.usersRepo.findOne(
      typeof id === "number" ? { where: { id } } : id,
    );
    if (!user) throw new NotFoundException("User with ID not found");

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const update = await this.usersRepo.update(id, updateUserDto);
    if (update.affected === 1) {
      const user = await this.findOne(id);
      return user;
    } else {
      throw new NotFoundException("User with ID not found");
    }
  }

  async remove(id: number) {
    const deleted = await this.usersRepo.delete(id);
    if (deleted.affected === 1) {
      return {
        id,
      };
    } else {
      throw new NotFoundException("User with ID not found");
    }
  }
}
