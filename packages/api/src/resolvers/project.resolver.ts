import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectArgs } from '@generated/project/find-many-project.args';
import { CreateOneProjectArgs } from '@generated/project/create-one-project.args';
import { FindFirstProjectArgs } from '@generated/project/find-first-project.args';

@Resolver()
export class ProjectResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Response, { description: '.' })
  async findFirstProject(@Args() args?: FindFirstProjectArgs) {
    const response = await this.prisma.project.findFirst(args);
    return { response };
  }

  @Query(() => Response, { description: '.' })
  async findManyProject(@Args() args?: FindManyProjectArgs) {
    const response = await this.prisma.project.findMany(args);
    return { response };
  }

  @Mutation(() => Response, { description: '.' })
  async upsertProject(@Args() args: CreateOneProjectArgs) {
    const { data } = args;
    const existRecord = await this.prisma.project.findFirst({
      where: {
        AND: [
          { service_id: data.service_id },
          { project_code: data.project_code },
        ],
      },
    });
    if (existRecord) {
      const response = await this.prisma.project.update({
        where: { project_id: existRecord.project_id },
        data,
      });
      return { response };
    } else {
      const response = await this.prisma.project.create({
        data,
      });
      return { response };
    }
  }
}
