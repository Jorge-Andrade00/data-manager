import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(9)
  @MinLength(8)
  @Transform(({ value }) => value.toLowerCase())
  rut: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value.toLowerCase())
  firstSurname?: string;

  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value.toLowerCase())
  secondSurname?: string;
}
