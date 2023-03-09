import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectLedgerArgs } from '@generated/prisma/find-many-project-ledger.args';
import { CreateOneProjectLedgerArgs } from '@generated/prisma/create-one-project-ledger.args';

@Resolver()
export class ProjectFinancialResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProjectLedger(@Args() args?: FindManyProjectLedgerArgs) {
    const response = await this.prisma.project_ledger.findMany(args);
    return { response };
  }

  @Mutation(() => Response, { description: '.' })
  async upsertProjectLedger(@Args() args: CreateOneProjectLedgerArgs) {
    const { data } = args;
    const existRecord = await this.prisma.project_ledger.findFirst({
      where: {
        project_id: { equals: data.project_id },
      },
    });
    if (existRecord) {
      const response = await this.prisma.project_ledger.update({
        where: {
          index: existRecord.index,
        },
        data,
      });
      return { response };
    } else {
      const response = await this.prisma.project_ledger.create({
        data,
      });
      return { response };
    }
  }
}
