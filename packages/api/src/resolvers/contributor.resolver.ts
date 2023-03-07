import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyContributorArgs } from '@generated/contributor/find-many-contributor.args';

@Resolver()
export class ContributorResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyContributor(@Args() args?: FindManyContributorArgs) {
    const response = await this.prisma.contributor.findMany(args);
    return { response };
  }
}
