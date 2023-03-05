import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindContributor } from '@generated/project/find-contributor.args';

@Resolver()
export class ContributorResult {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProject(@Args() args?: FindContributor) {
    const response = await this.prisma.contributor.findMany(args);
    return { response };
  }
}
