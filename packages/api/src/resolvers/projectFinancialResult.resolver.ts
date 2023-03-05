import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectLedgerArgs } from '@generated/project/find-many-project-ledger.args';

@Resolver()
export class ProjectDetailResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProject(@Args() args?: FindManyProjectLedgerArgs) {
    const response = await this.prisma.project.findMany(args);
    return { response };
  }
}
