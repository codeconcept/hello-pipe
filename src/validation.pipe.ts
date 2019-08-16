import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    const nbErrors = errors.length;
    const errorSingularPlural = nbErrors < 2 ? 'error' : 'errors';
    if (nbErrors > 0) {
      // tslint:disable-next-line: no-console
      console.log(
        errors.map(err => ({ property: err.property, message: err.constraints })),
      );
      throw new BadRequestException(`${nbErrors} ${errorSingularPlural}`);
    }
    return value;
  }
}
