export * from './prisma.service';
import { PrismaService } from './prisma.service';
export * from './google.service';
import { GoogleService } from './google.service';
export * from './ether.service';
import { EtherService } from './ether.service';
export * from './test.service';
import { TestService } from './test.service';
export * from './jira.service';
import { JiraService } from './jira.service';
export * from './contractBallot.service';
import { ContractBallotService } from './contractBallot.service';
export * from './contractFund.service';
import { ContractFundService } from './contractFund.service';
export * from './voter.service';
import { VoterService } from './voter.service';

export const Services = [
  PrismaService,
  GoogleService,
  EtherService,
  TestService,
  JiraService,
  ContractBallotService,
  ContractFundService,
  VoterService,
];
