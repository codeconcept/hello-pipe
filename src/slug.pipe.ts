import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SlugPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      return value;
    }
    // based on https://gist.github.com/codeguy/6684588
    return value
      .replace(/[éèë]/g, 'e') // replace accent with non accentuated letter
      .replace(/[^A-Z-a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
      .toLocaleLowerCase();
  }
}
