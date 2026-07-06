import { GenderType } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
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
}