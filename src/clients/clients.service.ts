import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { SafeClient } from './types/client.types';
import { UpdateClientDto } from './dto/update-client.dto';


@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async create(dto: CreateClientDto, createdById: string): Promise<SafeClient> {
    const existingClient = await this.clientsRepository.findByBi(dto.bi);

    if (existingClient) {
      throw new ConflictException('BI ja esta registado');
    }

    return this.clientsRepository.create({
      name: dto.name,
      email: dto.email,
      bi: dto.bi,
      nuit: dto.nuit,
      address: dto.address,
      nationality: dto.nationality,
      gender: dto.gender,
      fatherName: dto.fatherName,
      motherName: dto.motherName,
      phone: dto.phone,
      createdBy: {
        connect: { id: createdById },
      },
    });
  }

  async findAll(): Promise<SafeClient[]> {
    return await this.clientsRepository.findAll();
  }

  async findById(id: string): Promise<SafeClient | null> {
    return await this.clientsRepository.findById(id);
  }

  async update(id: string, dto: UpdateClientDto): Promise<SafeClient> {
    return await this.clientsRepository.update(id, dto);
  }

  async delete(id: string): Promise<SafeClient> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente nao encontrado');
    }
    return await this.clientsRepository.delete(id);
  }
}
