import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereInput } from './voter-where.input';
import { Type } from 'class-transformer';
import { VoterOrderByWithAggregationInput } from './voter-order-by-with-aggregation.input';
import { VoterScalarFieldEnum } from './voter-scalar-field.enum';
import { VoterScalarWhereWithAggregatesInput } from './voter-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { VoterCountAggregateInput } from './voter-count-aggregate.input';
import { VoterAvgAggregateInput } from './voter-avg-aggregate.input';
import { VoterSumAggregateInput } from './voter-sum-aggregate.input';
import { VoterMinAggregateInput } from './voter-min-aggregate.input';
import { VoterMaxAggregateInput } from './voter-max-aggregate.input';

@ArgsType()
export class VoterGroupByArgs {

    @Field(() => VoterWhereInput, {nullable:true})
    @Type(() => VoterWhereInput)
    where?: VoterWhereInput;

    @Field(() => [VoterOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<VoterOrderByWithAggregationInput>;

    @Field(() => [VoterScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof VoterScalarFieldEnum>;

    @Field(() => VoterScalarWhereWithAggregatesInput, {nullable:true})
    having?: VoterScalarWhereWithAggregatesInput;

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
