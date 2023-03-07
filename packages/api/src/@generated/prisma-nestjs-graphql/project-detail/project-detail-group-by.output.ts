import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Project_detailCountAggregate } from './project-detail-count-aggregate.output';
import { Project_detailAvgAggregate } from './project-detail-avg-aggregate.output';
import { Project_detailSumAggregate } from './project-detail-sum-aggregate.output';
import { Project_detailMinAggregate } from './project-detail-min-aggregate.output';
import { Project_detailMaxAggregate } from './project-detail-max-aggregate.output';

@ObjectType()
export class Project_detailGroupBy {

    @Field(() => Int, {nullable:false})
    index!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => Int, {nullable:false})
    ticket_count_total!: number;

    @Field(() => Int, {nullable:false})
    ticket_count_closed!: number;

    @Field(() => Float, {nullable:false})
    sum_project_amount!: number;

    @Field(() => Int, {nullable:false})
    credit_amount!: number;

    @Field(() => Int, {nullable:false})
    carry_over_balance!: number;

    @Field(() => Int, {nullable:false})
    price_coefficient!: number;

    @Field(() => Date, {nullable:true})
    campaign_deadline?: Date | string;

    @Field(() => Date, {nullable:true})
    fundraising_deadline?: Date | string;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

    @Field(() => Project_detailCountAggregate, {nullable:true})
    _count?: Project_detailCountAggregate;

    @Field(() => Project_detailAvgAggregate, {nullable:true})
    _avg?: Project_detailAvgAggregate;

    @Field(() => Project_detailSumAggregate, {nullable:true})
    _sum?: Project_detailSumAggregate;

    @Field(() => Project_detailMinAggregate, {nullable:true})
    _min?: Project_detailMinAggregate;

    @Field(() => Project_detailMaxAggregate, {nullable:true})
    _max?: Project_detailMaxAggregate;
}
