import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { SafeUser } from './types/user.types';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<SafeUser> {
    // 1.Verificar se o user ja existe

    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email ja existe');
    }

    // 2.Fazer o hash da senha
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // 3.Chamar o repository
    return await this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash: passwordHash,
      role: dto.role,
    });
  }

  async findAll(): Promise<SafeUser[]> {
    return await this.usersRepository.findAll();
  }

  async findById(id: string): Promise<SafeUser | null> {
    return await this.usersRepository.findById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<SafeUser> {
    return await this.usersRepository.update(id, {
      name: dto.name,
      email: dto.email,
      role: dto.role,
      ...(dto.password && {
        passwordHash: await bcrypt.hash(dto.password, 10),
      }),
    });
  }

  async delete(id: string): Promise<SafeUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Conta nao existe');
    }

    return await this.usersRepository.delete(id);
  }
}
