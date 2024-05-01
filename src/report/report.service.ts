import { Inject, Injectable } from '@nestjs/common';
import { ReportError } from './entities/report.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @Inject('REPORT_REPOSITORY')
    private readonly repository: Repository<ReportError>,
  ) {}

  create(report: ReportError, animeId: number, episodeId: number) {
    report.animeId = animeId;
    report.episodioId = episodeId;
    this.repository.save(report);
  }

  async update(
    id: number,
    updatedReport: Partial<ReportError>,
  ): Promise<ReportError> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedReport,
    );

    if (updateResult.affected === 0) {
      throw new Error(' não encontrado ou a atualização falhou');
    }
    const report: ReportError = await this.repository.findOne({
      where: {
        idReport: id,
      },
    });
    return report;
  }

  async findOne(id: number): Promise<ReportError> {
    return await this.repository.findOne({
      where: {
        idReport: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }

  async findAll() {
    return this.repository.find();
  }

}
