import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoricService } from './historic.service';
import { Historic } from './entities/historic.entity';
import { DeleteResult } from 'typeorm';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get()
  async findAll(): Promise<Historic[]> {
    return this.historicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Historic> {
    return this.historicService.findOne(+id);
  }

  @Post()
  async create(
    @Body() historic: Historic,
    @Body('userId') userId: number,
    @Body('episodeId') episodeId: number,
  ): Promise<Historic> {
    return this.historicService.create(historic,userId, episodeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedHistoric: Partial<Historic>,
  ): Promise<Historic> {
    return this.historicService.update(+id, updatedHistoric);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.historicService.delete(+id);
  }
}
