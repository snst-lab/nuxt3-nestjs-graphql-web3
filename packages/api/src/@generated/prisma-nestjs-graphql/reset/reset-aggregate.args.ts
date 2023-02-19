import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereInput } from './reset-where.input';
import { Type } from 'class-transformer';
import { ResetOrderByWithRelationInput } from './reset-order-by-with-relation.input';
import { ResetWhereUniqueInput } from './reset-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ResetCountAggregateInput } from './reset-count-aggregate.input';
import { ResetAvgAggregateInput } from './reset-avg-aggregate.input';
import { ResetSumAggregateInput } from './reset-sum-aggregate.input';
import { ResetMinAggregateInput } from './reset-min-aggregate.input';
import { ResetMaxAggregateInput } from './reset-max-aggregate.input';

@ArgsType()
export class ResetAggregateArgs {

    @Field(() => ResetWhereInput, {nullable:true})
    @Type(() => ResetWhereInput)
    where?: ResetWhereInput;

    @Field(() => [ResetOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ResetOrderByWithRelationInput>;

    @Field(() => ResetWhereUniqueInput, {nullable:true})
    cursor?: ResetWhereUniqueInput;

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
