import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereInput } from './reset-where.input';
import { Type } from 'class-transformer';
import { ResetOrderByWithAggregationInput } from './reset-order-by-with-aggregation.input';
import { ResetScalarFieldEnum } from './reset-scalar-field.enum';
import { ResetScalarWhereWithAggregatesInput } from './reset-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ResetCountAggregateInput } from './reset-count-aggregate.input';
import { ResetAvgAggregateInput } from './reset-avg-aggregate.input';
import { ResetSumAggregateInput } from './reset-sum-aggregate.input';
import { ResetMinAggregateInput } from './reset-min-aggregate.input';
import { ResetMaxAggregateInput } from './reset-max-aggregate.input';

@ArgsType()
export class ResetGroupByArgs {

    @Field(() => ResetWhereInput, {nullable:true})
    @Type(() => ResetWhereInput)
    where?: ResetWhereInput;

    @Field(() => [ResetOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ResetOrderByWithAggregationInput>;

    @Field(() => [ResetScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ResetScalarFieldEnum>;

    @Field(() => ResetScalarWhereWithAggregatesInput, {nullable:true})
    having?: ResetScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ResetCountAggregateInput, {nullable:true})
    _count?: ResetCountAggregateInput;

    @Field(() => ResetAvgAggregateInput, {nullable:true})
    _avg?: ResetAvgAggregateInput;

    @Field(() => ResetSumAggregateInput, {nullable:true})
    _sum?: ResetSumAggregateInput;

    @Field(() => ResetMinAggregateInput, {nullable:true})
    _min?: ResetMinAggregateInput;

    @Field(() => ResetMaxAggregateInput, {nullable:true})
    _max?: ResetMaxAggregateInput;
}
