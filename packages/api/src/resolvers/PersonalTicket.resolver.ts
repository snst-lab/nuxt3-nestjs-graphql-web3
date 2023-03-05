import { Args, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/models';
import { PrismaService } from '@/services';
import { FindPersonalTicket } from '@generated/project/find-personal-ticket.args';

@Resolver()
export class PersonalTicketResult {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Response, { description: '.' })
  async findManyProject(@Args() args?: FindPersonalTicket) {
    const response = await this.prisma.ticket.findMany(args);
    return { response };
  }
}
