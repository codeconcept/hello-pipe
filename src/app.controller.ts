import { Controller, Get, Param, UsePipes, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UpperPipe } from './upper.pipe';
import { SlugPipe } from './slug.pipe';
import { ParseIntPipe } from './parse-int.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('articles/:id')
  @UsePipes(ParseIntPipe)
  getArticleById(@Param('id') id) {
    const idType = typeof id;
    const res = { id, idType };
    return res;
  }

  @Post('slugify')
  @UsePipes(SlugPipe)
  makeSlug(@Body('title') title, @Body() allBody) {
    allBody.slug = title;
    return allBody;
  }

  @Post()
  @UsePipes(UpperPipe)
  createMessage(@Body() message) {
    return message;
  }
}
