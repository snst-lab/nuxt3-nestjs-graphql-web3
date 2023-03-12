import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Project_ledgerCountAggregate } from './project-ledger-count-aggregate.output';
import { Project_ledgerAvgAggregate } from './project-ledger-avg-aggregate.output';
import { Project_ledgerSumAggregate } from './project-ledger-sum-aggregate.output';
import { Project_ledgerMinAggregate } from './project-ledger-min-aggregate.output';
import { Project_ledgerMaxAggregate } from './project-ledger-max-aggregate.output';

@ObjectType()
export class Project_ledgerGroupBy {

    @Field(() => Int, {nullable:false})
    index!: number;

    @Field(() => Date, {nullable:false})
    created_date!: Date | string;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    target!: number;

    @Field(() => String, {nullable:false})
    unit!: string;

    @Field(() => Float, {nullable:false})
    income!: number;

    @Field(() => Float, {nullable:false})
    expense!: number;

    @Field(() => String, {nullable:false})
    review_phase!: string;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

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
