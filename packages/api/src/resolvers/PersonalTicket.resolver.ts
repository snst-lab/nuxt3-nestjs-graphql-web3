import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindManyTicketArgs } from '@generated/ticket/find-many-ticket.args';

@Resolver()
export class PersonalTicketResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyPersonalTicket(@Args() args?: FindManyTicketArgs) {
    const { where } = args;
    const response = await this.prisma.ticket.findMany({
      where: {
        AND: [{ contributor_id: where.contributor_id }],
      },
    });
    return { response };
  }
}
