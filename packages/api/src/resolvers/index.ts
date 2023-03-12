import { ProjectResolver } from './project.resolver';
import { ProjectDetailResolver } from './projectDetail.resolver';
import { ContributorResolver } from './contributor.resolver';
import { PersonalTicketResolver } from './personalTicket.resolver';
import { ProjectTicketResolver } from './projectTicket.resolver';
import { ProjectLedgerResolver } from './projectLedger.resolver';
import { VoterResolver } from './voter.resolver';

export const Resolvers = [
  ProjectResolver,
  ProjectDetailResolver,
  ContributorResolver,
  PersonalTicketResolver,
  ProjectTicketResolver,
  ProjectLedgerResolver,
  VoterResolver,
];
