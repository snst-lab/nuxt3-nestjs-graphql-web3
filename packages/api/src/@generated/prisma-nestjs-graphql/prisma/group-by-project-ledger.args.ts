import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerWhereInput } from '../project-ledger/project-ledger-where.input';
import { Type } from 'class-transformer';
import { Project_ledgerOrderByWithAggregationInput } from '../project-ledger/project-ledger-order-by-with-aggregation.input';
import { Project_ledgerScalarFieldEnum } from '../project-ledger/project-ledger-scalar-field.enum';
import { Project_ledgerScalarWhereWithAggregatesInput } from '../project-ledger/project-ledger-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupByProjectLedgerArgs {

    @Field(() => Project_ledgerWhereInput, {nullable:true})
    @Type(() => Project_ledgerWhereInput)
    where?: Project_ledgerWhereInput;

    @Field(() => [Project_ledgerOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<Project_ledgerOrderByWithAggregationInput>;

    @Field(() => [Project_ledgerScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Project_ledgerScalarFieldEnum>;

    @Field(() => Project_ledgerScalarWhereWithAggregatesInput, {nullable:true})
    having?: Project_ledgerScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
