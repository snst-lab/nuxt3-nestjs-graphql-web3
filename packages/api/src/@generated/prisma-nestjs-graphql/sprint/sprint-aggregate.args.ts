import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereInput } from './sprint-where.input';
import { Type } from 'class-transformer';
import { SprintOrderByWithRelationInput } from './sprint-order-by-with-relation.input';
import { SprintWhereUniqueInput } from './sprint-where-unique.input';
import { Int } from '@nestjs/graphql';
import { SprintCountAggregateInput } from './sprint-count-aggregate.input';
import { SprintAvgAggregateInput } from './sprint-avg-aggregate.input';
import { SprintSumAggregateInput } from './sprint-sum-aggregate.input';
import { SprintMinAggregateInput } from './sprint-min-aggregate.input';
import { SprintMaxAggregateInput } from './sprint-max-aggregate.input';

@ArgsType()
export class SprintAggregateArgs {

    @Field(() => SprintWhereInput, {nullable:true})
    @Type(() => SprintWhereInput)
    where?: SprintWhereInput;

    @Field(() => [SprintOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<SprintOrderByWithRelationInput>;

    @Field(() => SprintWhereUniqueInput, {nullable:true})
    cursor?: SprintWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => SprintCountAggregateInput, {nullable:true})
    _count?: SprintCountAggregateInput;

    @Field(() => SprintAvgAggregateInput, {nullable:true})
    _avg?: SprintAvgAggregateInput;

    @Field(() => SprintSumAggregateInput, {nullable:true})
    _sum?: SprintSumAggregateInput;

    @Field(() => SprintMinAggregateInput, {nullable:true})
    _min?: SprintMinAggregateInput;

    @Field(() => SprintMaxAggregateInput, {nullable:true})
    _max?: SprintMaxAggregateInput;
}
