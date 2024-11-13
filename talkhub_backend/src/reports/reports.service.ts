import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { ReportDto } from './dto/report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { DeleteReportDto } from './dto/delete-report.dto';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReportsService extends Repository<
  ReportDto,
  CreateReportDto,
  DeleteReportDto
> {
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.reports);
  }

  async getAllReports() {
    return this.drizzle.query.reports.findMany({
      with: {
        user: true,
        reporting_user: true,
        comment: true,
      },
      columns: {
        id_report: true,
        id_comment: true,
        id_user: true,
        reason: true,
        date: true,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    this.drizzle
      .delete(schema.reports)
      .where(eq(schema.reports.id_report, id))
      .run();
  }

  async getReportById(id: number): Promise<ReportDto> {
    return this.drizzle.query.reports.findFirst({
      where: (reports, { eq }) => eq(reports.id_report, id),
      with: {
        user: true,
        comment: true,
      },
      columns: {
        id_report: true,
        id_comment: true,
        id_user: true,
        reason: true,
        date: true,
      },
    });
  }
}
