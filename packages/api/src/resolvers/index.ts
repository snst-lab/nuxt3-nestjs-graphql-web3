import { ProjectResolver } from './project.resolver';
import { ProjectDetailResolver } from './projectDetail.resolver';
import { ContributorResolver } from './contributor.resolver';
import { PersonalTicketResolver } from './PersonalTicket.resolver';
import { ProjectTicketResolver } from './ProjectTicket.resolver';
import { ProjectFinancialResolver } from './projectFinancialResult.resolver';
import { VoterResolver } from './voter.resolver';

export const Resolvers = [
  ProjectResolver,
  ProjectDetailResolver,
  ContributorResolver,
  PersonalTicketResolver,
  ProjectTicketResolver,
  ProjectFinancialResolver,
  VoterResolver,
];
