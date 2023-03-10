import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectDetailArgs } from '@generated/prisma/find-many-project-detail.args';
import { FindFirstProjectDetailArgs } from '@generated/prisma/find-first-project-detail.args';

@Resolver()
export class ProjectDetailResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Response, { description: '.' })
  async findFirstProjectDetail(@Args() args?: FindFirstProjectDetailArgs) {
    const response = await this.prisma.project_detail.findFirst(args);
    return { response };
  }

  @Query(() => Response, { description: '.' })
  async findManyProjectDetail(@Args() args?: FindManyProjectDetailArgs) {
    const response = await this.prisma.project_detail.findMany(args);
    return { response };
  }
}
