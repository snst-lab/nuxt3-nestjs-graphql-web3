import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { PrismaService } from '@/services';
import { Response } from '@/models';
import { AuthGuard, GuardResponse } from '@/guards';
import { FindFirstUserArgs } from '@generated/user/find-first-user.args';
import { FindManyUserArgs } from '@generated/user/find-many-user.args';
import { CreateOneUserArgs } from '@generated/user/create-one-user.args';
import { GraphQLError } from 'graphql';
import { tools } from '@tools';

@Resolver()
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Query(() => Response, { description: '.' })
  async findUser(
    @Args() args?: FindFirstUserArgs,
    @GuardResponse() guard?: Guard.Auth,
  ) {
    const { type, profile } = guard.auth;
    const { social_id } = profile;
    const response = await this.prisma.user.findFirst({
      where: { auth_type: type, social_id },
    });
    return { response };
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { description: '.' })
  async findManyUser(
    @Args() args?: FindManyUserArgs,
    @GuardResponse() guard?: Guard.Auth,
  ) {
    const response = await this.prisma.user.findMany(args);
    return { response };
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Response, { description: '.' })
  async upsertUser(
    @Args() args: CreateOneUserArgs,
    @GuardResponse() guard: Guard.Auth,
  ) {
    try {
      const existRecord = await this.prisma.user.findFirst({
        where: {
          AND: [
            { auth_type: guard.auth.type },
            { social_id: guard.auth.profile.social_id },
          ],
        },
      });
      if (guard.auth.profile.social_id !== args.data.social_id) {
        throw new Error();
      }
      if (existRecord) {
        const response = await this.prisma.user.update({
          where: { id: existRecord.id },
          data: args.data,
        });
        return { response };
      } else {
        args.data.user_id = tools.random.base36();
        const isDuplicate = await this.prisma.user.findFirst({
          where: {
            user_id: args.data.user_id,
          },
        });
        if (isDuplicate) {
          throw new Error();
        }
        const response = await this.prisma.user.create({ data: args.data });
        return { response };
      }
    } catch {
      throw new GraphQLError('', {
        extensions: {
          code: 'bad-request',
          response: {
            statusCode: 401,
          },
        },
      });
    }
  }
}
