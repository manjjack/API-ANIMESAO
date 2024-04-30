import { Inject, Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class ReportService {
  /*
  constructor(
    @Inject('REPORT_REPOSITORY')
    private readonly repository: Repository<Report>,
  ) {}
  
  create(report: Report, animeId: number, episodeId: number) {
    report.animeId = animeId;
    report.episodioId = episodeId;
    this.repository.save(report);
  }

  async update(id: number, updatedReport: Partial<Report>): Promise<Report> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedReport,
    );

    if (updateResult.affected === 0) {
      throw new Error(' não encontrado ou a atualização falhou');
    }
    const report: Report = await this.repository.findOne({
      where: {
        idReport: id,
      },
    });
    return report;
  }

  async findOne(id: number): Promise<Report> {
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
    this.repository.find();
  }

  async solveReport(idReport: number) {
    const change = false;
    this.repository
      .createQueryBuilder('report')
      .where('report.status :change', { change });
  }*/
}
