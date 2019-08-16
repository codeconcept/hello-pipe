import { Length, IsEmail, Contains } from 'class-validator';

export class CreateArticleDto {
  @Contains('JS')
  @Length(2, 10)
  readonly title: string;
  readonly content: string;
  readonly author: string;
  @IsEmail()
  readonly authorEmail: string;
  readonly creationDate: string;
}
