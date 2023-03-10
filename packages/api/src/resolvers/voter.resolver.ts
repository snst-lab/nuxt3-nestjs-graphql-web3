import {
  Args,
  ArgsType,
  Field,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Response } from '@/models';
import { ContractBallotService, PrismaService } from '@/services';
import { FindManyVoterArgs } from '@generated/voter/find-many-voter.args';

@ArgsType()
export class VoteArgs {
  @Field(() => String, { nullable: false })
  voter_address: string;

  @Field(() => Int, { nullable: false })
  project_id: number;

  @Field(() => Float, { nullable: false })
  amount: number;
}

@ArgsType()
export class ReconcileArgs {
  @Field(() => String, { nullable: false })
  voter_address: string;
}

@Resolver()
export class VoterResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contractBallotService: ContractBallotService,
  ) {}

  @Query(() => Response, { description: '.' })
  async findManyVoter(@Args() args?: FindManyVoterArgs) {
    const response = await this.prisma.voter.findMany(args);
    return {
      response: response.map((e) => {
        return {
          name: e.name,
          evm_address: e.evm_address,
          token_balance: e.token_balance,
          max_voteable: e.max_voteable,
          pending_airdrop: e.pending_airdrop,
          pending_reconcile: e.pending_reconcile,
        };
      }),
    };
  }

  @Mutation(() => Response, { description: '.' })
  async vote(@Args() args: VoteArgs) {
    const { voter_address, project_id, amount } = args;
    await this.contractBallotService.vote(voter_address, project_id, amount);

    return { response: { project_id, amount } };
  }

  @Mutation(() => Response, { description: '.' })
  async unvote(@Args() args: VoteArgs) {
    const { voter_address, project_id, amount } = args;
    await this.contractBallotService.unvote(voter_address, project_id, amount);

    return { response: { project_id, amount } };
  }

  @Mutation(() => Response, { description: '.' })
  async reconcile(@Args() args: ReconcileArgs) {
    await this.contractBallotService.reconcile(args.voter_address);
    return { response: {} };
  }

  @Mutation(() => Response, { description: '.' })
  async bulkAirdrop() {
    try {
      const response = await this.prisma.voter.findMany();
      await response.forEach(async (e) => {
        await this.contractBallotService.airdrop(
          e.evm_address,
          e.pending_airdrop,
        );
        await this.prisma.voter.update({
          where: {
            id: e.id,
          },
          data: {
            pending_airdrop: 0,
          },
        });
      });
      return {
        response: response.map((e) => ({
          name: e.name,
        })),
      };
    } catch (error) {
      console.log(error);
      return { response: false };
    }
  }
}
