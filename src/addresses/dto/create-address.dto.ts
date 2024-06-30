import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value.toLowerCase())
  street: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  @Transform(({ value }) => value.toLowerCase())
  number: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value.toLowerCase())
  city: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
