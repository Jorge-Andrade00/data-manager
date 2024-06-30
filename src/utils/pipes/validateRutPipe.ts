import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateRutPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidRut(value.rut)) {
      throw new BadRequestException('Invalid RUT format');
    }
    return value;
  }

  private isValidRut(rut: string): boolean {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += Number(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const mod = sum % 11;
    const computedDv = mod === 0 ? '0' : mod === 1 ? 'K' : String(11 - mod);

    return computedDv === dv;
  }
}
