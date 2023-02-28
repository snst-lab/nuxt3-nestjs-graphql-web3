import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Project_ledgerCountAggregate } from './project-ledger-count-aggregate.output';
import { Project_ledgerAvgAggregate } from './project-ledger-avg-aggregate.output';
import { Project_ledgerSumAggregate } from './project-ledger-sum-aggregate.output';
import { Project_ledgerMinAggregate } from './project-ledger-min-aggregate.output';
import { Project_ledgerMaxAggregate } from './project-ledger-max-aggregate.output';

@ObjectType()
export class AggregateProject_ledger {

    @Field(() => Project_ledgerCountAggregate, {nullable:true})
    _count?: Project_ledgerCountAggregate;

    @Field(() => Project_ledgerAvgAggregate, {nullable:true})
    _avg?: Project_ledgerAvgAggregate;

    @Field(() => Project_ledgerSumAggregate, {nullable:true})
    _sum?: Project_ledgerSumAggregate;

    @Field(() => Project_ledgerMinAggregate, {nullable:true})
    _min?: Project_ledgerMinAggregate;

    @Field(() => Project_ledgerMaxAggregate, {nullable:true})
    _max?: Project_ledgerMaxAggregate;
}
