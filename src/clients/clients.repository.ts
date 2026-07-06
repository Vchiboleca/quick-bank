import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SafeClient } from './types/client.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly safeFields = {
    id: true,
    name: true,
    email: true,
    bi: true,
    nuit: true,
    address: true,
    nationality: true,
    gender: true,
    fatherName: true,
    motherName: true,
    phone: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(data: Prisma.ClientCreateInput): Promise<SafeClient> {
    return await this.prisma.client.create({
      data,
      select: this.safeFields,
    });
  }

  async findAll(): Promise<SafeClient[]> {
    return await this.prisma.client.findMany({
      select: this.safeFields,
    });
  }

  async findById(id: string): Promise<SafeClient | null> {
    return await this.prisma.client.findUnique({
      where: { id },
      select: this.safeFields,
    });
  }

  async findByBi(bi: string): Promise<SafeClient | null> {
    return await this.prisma.client.findUnique({
      where: { bi },
      select: this.safeFields,
    });
  }

  async update(
    id: string,
    data: Prisma.ClientUpdateInput,
  ): Promise<SafeClient> {
    return await this.prisma.client.update({
      where: { id },
      data,
      select: this.safeFields,
    });
  }

  async delete(id: string): Promise<SafeClient> {
    return await this.prisma.client.delete({
      where: { id },
      select: this.safeFields,
    });
  }
}
