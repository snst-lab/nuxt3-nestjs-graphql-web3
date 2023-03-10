import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereInput } from './voter-where.input';
import { Type } from 'class-transformer';
import { VoterOrderByWithRelationInput } from './voter-order-by-with-relation.input';
import { VoterWhereUniqueInput } from './voter-where-unique.input';
import { Int } from '@nestjs/graphql';
import { VoterCountAggregateInput } from './voter-count-aggregate.input';
import { VoterAvgAggregateInput } from './voter-avg-aggregate.input';
import { VoterSumAggregateInput } from './voter-sum-aggregate.input';
import { VoterMinAggregateInput } from './voter-min-aggregate.input';
import { VoterMaxAggregateInput } from './voter-max-aggregate.input';

@ArgsType()
export class VoterAggregateArgs {

    @Field(() => VoterWhereInput, {nullable:true})
    @Type(() => VoterWhereInput)
    where?: VoterWhereInput;

    @Field(() => [VoterOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VoterOrderByWithRelationInput>;

    @Field(() => VoterWhereUniqueInput, {nullable:true})
    cursor?: VoterWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => VoterCountAggregateInput, {nullable:true})
    _count?: VoterCountAggregateInput;

    @Field(() => VoterAvgAggregateInput, {nullable:true})
    _avg?: VoterAvgAggregateInput;

    @Field(() => VoterSumAggregateInput, {nullable:true})
    _sum?: VoterSumAggregateInput;

    @Field(() => VoterMinAggregateInput, {nullable:true})
    _min?: VoterMinAggregateInput;

    @Field(() => VoterMaxAggregateInput, {nullable:true})
    _max?: VoterMaxAggregateInput;
}
