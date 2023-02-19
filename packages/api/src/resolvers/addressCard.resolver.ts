import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { PrismaService } from '@/services';
import { Response } from '@/models';
import { AuthGuard, EtherGuard, GuardResponse } from '@/guards';
import { FindFirstAddressCardArgs } from '@generated/address-card/find-first-address-card.args';
import { FindManyAddressCardArgs } from '@generated/address-card/find-many-address-card.args';
import { CreateOneAddressCardArgs } from '@generated/address-card/create-one-address-card.args';

@Resolver()
export class AddressCardResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Query(() => Response, { description: '.' })
  async findAddressCard(
    @Args() args?: FindFirstAddressCardArgs,
    @GuardResponse() guard?: Guard.Auth,
  ) {
    const { email } = guard.auth.profile;
    const response = await this.prisma.addressCard.findFirst({
      where: { email },
    });
    return { response };
  }

  @UseGuards(AuthGuard)
  @Query(() => Response, { description: '.' })
  async findManyAddressCard(
    @Args() args?: FindManyAddressCardArgs,
    @GuardResponse() guard?: Guard.Auth,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        AND: [
          { auth_type: guard.auth.type },
          { social_id: guard.auth.profile.social_id },
        ],
      },
    });
    if (!user) {
      return { response: [] };
    }
    const response = await this.prisma.addressCard.findMany({
      where: {
        merchant_id: user.user_id,
      },
    });
    return { response };
  }

  @UseGuards(AuthGuard, EtherGuard)
  @Mutation(() => Response, { description: '.' })
  async upsertAddressCard(
    @Args() args: CreateOneAddressCardArgs,
    @GuardResponse() guard: Guard.Auth & Guard.Ether,
  ) {
    try {
      if (guard.auth.profile.social_id !== args.data.social_id) {
        throw new Error('unmatch-social-id');
      }
      if (
        guard.ether.address.toLocaleLowerCase() !==
        args.data.evm_address.toLocaleLowerCase()
      ) {
        throw new Error('unmatch-evm-address');
      }
      const existRecord = await this.prisma.addressCard.findFirst({
        where: {
          AND: [
            { merchant_id: args.data.merchant_id },
            { auth_type: guard.auth.type },
            { social_id: guard.auth.profile.social_id },
            { evm_address: args.data.evm_address },
          ],
        },
      });
      const email = guard.auth.profile.email;

      if (existRecord) {
        const response = await this.prisma.addressCard.update({
          where: { id: existRecord.id },
          data: { ...args.data, email },
        });
        return { response };
      } else {
        const response = await this.prisma.addressCard.create({
          data: { ...args.data, email },
        });
        return { response };
      }
    } catch (e) {
      throw new GraphQLError('', {
        extensions: {
          code: e.message,
          response: {
            statusCode: 400,
          },
        },
      });
    }
  }
}
