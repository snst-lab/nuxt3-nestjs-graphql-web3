import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereInput } from './contributor-where.input';
import { Type } from 'class-transformer';
import { ContributorOrderByWithRelationInput } from './contributor-order-by-with-relation.input';
import { ContributorWhereUniqueInput } from './contributor-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ContributorCountAggregateInput } from './contributor-count-aggregate.input';
import { ContributorAvgAggregateInput } from './contributor-avg-aggregate.input';
import { ContributorSumAggregateInput } from './contributor-sum-aggregate.input';
import { ContributorMinAggregateInput } from './contributor-min-aggregate.input';
import { ContributorMaxAggregateInput } from './contributor-max-aggregate.input';

@ArgsType()
export class ContributorAggregateArgs {

    @Field(() => ContributorWhereInput, {nullable:true})
    @Type(() => ContributorWhereInput)
    where?: ContributorWhereInput;

    @Field(() => [ContributorOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ContributorOrderByWithRelationInput>;

    @Field(() => ContributorWhereUniqueInput, {nullable:true})
    cursor?: ContributorWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ContributorCountAggregateInput, {nullable:true})
    _count?: ContributorCountAggregateInput;

    @Field(() => ContributorAvgAggregateInput, {nullable:true})
    _avg?: ContributorAvgAggregateInput;

    @Field(() => ContributorSumAggregateInput, {nullable:true})
    _sum?: ContributorSumAggregateInput;

    @Field(() => ContributorMinAggregateInput, {nullable:true})
    _min?: ContributorMinAggregateInput;

    @Field(() => ContributorMaxAggregateInput, {nullable:true})
    _max?: ContributorMaxAggregateInput;
}
