import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Historic } from './entities/historic.entity';

@Injectable()
export class HistoricService {
  constructor(
    @Inject('HISTORIC_REPOSITORY')
    private repository: Repository<Historic>,
  ) {}

  async findAll(): Promise<Historic[]> {
    return this.repository.find();
  }

  async create(historic: Historic, idUser: number, idEpisode: number): Promise<Historic> {
    historic.userId = idUser;
    historic.episodeId = idEpisode;
    return this.repository.save(historic);
  }

  async update(
    id: number,
    updatedEpisode: Partial<Historic>,
  ): Promise<Historic> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedEpisode,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const historic: Historic = await this.repository.findOne({
      where: {
        historicoId: id,
      },
    });
    return historic;
  }

  async findOne(id: number): Promise<Historic> {
    return await this.repository.findOne({
      where: {
        historicoId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }
}
