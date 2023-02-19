export * from './prisma.service';
import { PrismaService } from './prisma.service';
export * from './google.service';
import { GoogleService } from './google.service';
export * from './ether.service';
import { EtherService } from './ether.service';

export const Services = [PrismaService, GoogleService, EtherService];
