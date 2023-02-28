import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereInput } from './contributor-where.input';
import { Type } from 'class-transformer';
import { ContributorOrderByWithAggregationInput } from './contributor-order-by-with-aggregation.input';
import { ContributorScalarFieldEnum } from './contributor-scalar-field.enum';
import { ContributorScalarWhereWithAggregatesInput } from './contributor-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ContributorCountAggregateInput } from './contributor-count-aggregate.input';
import { ContributorAvgAggregateInput } from './contributor-avg-aggregate.input';
import { ContributorSumAggregateInput } from './contributor-sum-aggregate.input';
import { ContributorMinAggregateInput } from './contributor-min-aggregate.input';
import { ContributorMaxAggregateInput } from './contributor-max-aggregate.input';

@ArgsType()
export class ContributorGroupByArgs {

    @Field(() => ContributorWhereInput, {nullable:true})
    @Type(() => ContributorWhereInput)
    where?: ContributorWhereInput;

    @Field(() => [ContributorOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ContributorOrderByWithAggregationInput>;

    @Field(() => [ContributorScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ContributorScalarFieldEnum>;

    @Field(() => ContributorScalarWhereWithAggregatesInput, {nullable:true})
    having?: ContributorScalarWhereWithAggregatesInput;

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
