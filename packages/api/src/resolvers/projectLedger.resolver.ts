import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Response } from '@/models';
import {
  ContractBallotService,
  ContractFundService,
  PrismaService,
} from '@/services';
import { FindManyProjectLedgerArgs } from '@generated/prisma/find-many-project-ledger.args';
import { CreateOneProjectLedgerArgs } from '@generated/prisma/create-one-project-ledger.args';
import { Target } from '@/models';

@ArgsType()
export class MockUpdateLedgerArgs {
  @Field(() => String, { nullable: false })
  review_phase: string;
}

@Resolver()
export class ProjectLedgerResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contractFund: ContractFundService,
    private readonly contractBallot: ContractBallotService,
  ) {}

  @Query(() => Response, { description: '.' })
  async findManyProjectLedger(@Args() args?: FindManyProjectLedgerArgs) {
    const response = await this.prisma.project_ledger.findMany(
      Object.assign(args, {
        orderBy: [
          {
            project_id: 'asc',
            //   created_at: 'desc',
          },
        ],
      }),
    );
    return { response };
  }

  @Mutation(() => Response, { description: '.' })
  async upsertProjectLedger(@Args() args: CreateOneProjectLedgerArgs) {
    const { data } = args;
    const existRecord = await this.prisma.project_ledger.findFirst({
      where: {
        project_id: { equals: data.project_id },
      },
    });
    if (existRecord) {
      const response = await this.prisma.project_ledger.update({
        where: {
          index: existRecord.index,
        },
        data,
      });
      return { response };
    } else {
      const response = await this.prisma.project_ledger.create({
        data,
      });
      return { response };
    }
  }

  @Mutation(() => Response, { description: '.' })
  async mockUpdateLedger(@Args() args: MockUpdateLedgerArgs) {
    try {
      const income = await this.contractFund.harvestAll();
      const voters = await this.prisma.voter.findMany();
      for (const voter of voters) {
        const balance = await this.contractBallot.getTokenBalance(
          voter.evm_address,
        );
        const vote_amount = Math.floor(balance / 2);
        await this.contractBallot.vote(
          voter.evm_address,
          voter.mock_follow_project_id,
          vote_amount,
        );
      }
      const projects = await this.prisma.project.findMany({
        where: {
          review_phase: args.review_phase,
        },
      });
      if (projects.length === 0) {
        throw new Error();
      }
      const incomePerProjects = income / projects.length;
      if (incomePerProjects === 0) {
        throw new Error();
      }
      for (const project of projects) {
        const totalVotedAmount =
          await this.contractBallot.getVotedAmountByProjectId(
            project.project_id,
          );
        const voterList = await this.contractBallot.getVoterListByProjectId(
          project.project_id,
        );
        if (totalVotedAmount > 0) {
          for (const voter of voterList) {
            if (voter.votedAmount > 0) {
              const reward =
                (incomePerProjects * voter.votedAmount) / totalVotedAmount;

              await this.contractFund.transferReward(voter.evm_address, reward);

              const matchedList = await this.prisma.voter.findMany({
                where: {
                  evm_address: voter.evm_address,
                },
              });
              const shareReward = reward / matchedList.length;
              for (const matched of matchedList) {
                const matchedLedger =
                  await this.prisma.project_ledger.findFirst({
                    where: {
                      project_id: matched.project_id,
                      review_phase: args.review_phase,
                    },
                  });
                await this.prisma.project_ledger.upsert({
                  where: {
                    index: matchedLedger?.index ?? 0,
                  },
                  update: {
                    project_id: matched.project_id,
                    target: Target.Token,
                    unit: '',
                    income: shareReward,
                    expense: 0,
                    review_phase: args.review_phase,
                  },
                  create: {
                    project_id: matched.project_id,
                    target: Target.Token,
                    unit: '',
                    income: shareReward,
                    expense: 0,
                    review_phase: args.review_phase,
                  },
                });
              }
            }
          }
        }
      }
      return { response: true };
    } catch (e) {
      return { response: e.message };
    }
  }
}
