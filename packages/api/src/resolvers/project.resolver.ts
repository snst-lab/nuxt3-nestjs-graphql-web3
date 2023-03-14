import {
  Args,
  ArgsType,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyProjectArgs } from '@generated/project/find-many-project.args';
import { CreateOneProjectArgs } from '@generated/project/create-one-project.args';
import { FindFirstProjectArgs } from '@generated/project/find-first-project.args';
import { UseGuards } from '@nestjs/common';
import { EtherAdminGuard } from '@/guards';
import { GraphQLError } from 'graphql';

@InputType()
export class PrizeProjectInput {
  @Field(() => Number, { nullable: false })
  project_id: number;
  @Field(() => Boolean, { nullable: false })
  checked: boolean;
  @Field(() => String, { nullable: false })
  review_phase: string;
  @Field(() => Number, { nullable: false })
  invested_amount: number;
}

@ArgsType()
export class PrizeProjectArgs {
  @Field(() => [PrizeProjectInput], {
    nullable: false,
  })
  data!: PrizeProjectInput[];
}

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

  @Mutation(() => Response, { description: '.' })
  @UseGuards(EtherAdminGuard)
  async prizeProject(@Args() args: PrizeProjectArgs) {
    const { data } = args;
    try {
      for (const e of data) {
        const data = await this.prisma.project.update({
          where: { project_id: e.project_id },
          data: {
            invested_amount: e.invested_amount,
            review_phase: e.review_phase,
          },
        });
      }
      return { response: { data } };
    } catch {
      throw new GraphQLError('', {
        extensions: {
          code: 'prize-project-failed',
          response: {
            statusCode: 403,
          },
        },
      });
    }
  }
}
