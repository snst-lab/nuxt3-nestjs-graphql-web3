import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectLedgerArgs } from '@generated/prisma/find-many-project-ledger.args';

@Resolver()
export class ProjectFinancialResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProjectLedger(@Args() args?: FindManyProjectLedgerArgs) {
    const response = await this.prisma.project_ledger.findMany(args);
    return { response };
  }
}
