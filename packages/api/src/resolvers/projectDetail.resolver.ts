import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectDetailArgs } from '@generated/prisma/find-many-project-detail.args';

@Resolver()
export class ProjectDetailResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProjectDetail(@Args() args?: FindManyProjectDetailArgs) {
    const response = await this.prisma.project_detail.findMany(args);
    return { response };
  }
}
