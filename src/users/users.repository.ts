import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SafeUser } from './types/user.types';


@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly safeFields = {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(data: Prisma.UserCreateInput): Promise<SafeUser> {
    return await this.prisma.user.create({
      data,
      select: this.safeFields,
    });
  }

  async findAll(): Promise<SafeUser[]> {
    return await this.prisma.user.findMany({
      select: this.safeFields,
    });
  }

  async findById(id: string): Promise<SafeUser | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: this.safeFields,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<SafeUser> {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: this.safeFields,
    });
  }

  async delete(id: string): Promise<SafeUser> {
    return await this.prisma.user.delete({
      where: { id },
      select: this.safeFields,
    });
  }
}
