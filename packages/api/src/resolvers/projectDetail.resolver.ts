import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectFinancialResult } from '@generated/project/find-many-financial-result.args';

@Resolver()
export class FinancialResult {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProject(@Args() args?: FindManyProjectFinancialResult) {
    const response = await this.prisma.project_detail.findMany(args);
    return { response };
  }
}
