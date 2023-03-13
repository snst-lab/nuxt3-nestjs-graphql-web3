import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectSummaryBySprintArgs } from '@generated/prisma/find-many-project-summary-by-sprint.args';
import { FindFirstProjectSummaryBySprintArgs } from '@generated/prisma/find-first-project-summary-by-sprint.args';

@Resolver()
export class ProjectSummaryBySprintResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Response, { description: '.' })
  async findFirstProjectSummaryBySprint(
    @Args() args?: FindFirstProjectSummaryBySprintArgs,
  ) {
    const response = await this.prisma.project_summary_by_sprint.findFirst(
      args,
    );
    return { response };
  }

  @Query(() => Response, { description: '.' })
  async findManyProjectSummaryBySprint(
    @Args() args?: FindManyProjectSummaryBySprintArgs,
  ) {
    const response = await this.prisma.project_summary_by_sprint.findMany(args);
    return { response };
  }
}
