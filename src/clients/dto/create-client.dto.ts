import { GenderType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  bi!: string;

  @IsString()
  @IsOptional()
  nuit!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @IsString()
  @IsOptional()
  nationality!: string;

  @IsEnum(GenderType)
  gender!: GenderType;

  @IsString()
  @IsOptional()
  fatherName!: string;

  @IsString()
  @IsOptional()
  motherName!: string;

  @IsString()
  @IsOptional()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  createdById!: string;
}
