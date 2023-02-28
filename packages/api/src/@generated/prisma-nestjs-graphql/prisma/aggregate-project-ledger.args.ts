import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerWhereInput } from '../project-ledger/project-ledger-where.input';
import { Type } from 'class-transformer';
import { Project_ledgerOrderByWithRelationInput } from '../project-ledger/project-ledger-order-by-with-relation.input';
import { Project_ledgerWhereUniqueInput } from '../project-ledger/project-ledger-where-unique.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class AggregateProjectLedgerArgs {

    @Field(() => Project_ledgerWhereInput, {nullable:true})
    @Type(() => Project_ledgerWhereInput)
    where?: Project_ledgerWhereInput;

    @Field(() => [Project_ledgerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<Project_ledgerOrderByWithRelationInput>;

    @Field(() => Project_ledgerWhereUniqueInput, {nullable:true})
    cursor?: Project_ledgerWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
