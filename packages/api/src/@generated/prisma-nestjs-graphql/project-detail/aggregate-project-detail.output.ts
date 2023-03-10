import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Project_detailCountAggregate } from './project-detail-count-aggregate.output';
import { Project_detailAvgAggregate } from './project-detail-avg-aggregate.output';
import { Project_detailSumAggregate } from './project-detail-sum-aggregate.output';
import { Project_detailMinAggregate } from './project-detail-min-aggregate.output';
import { Project_detailMaxAggregate } from './project-detail-max-aggregate.output';

@ObjectType()
export class AggregateProject_detail {

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
