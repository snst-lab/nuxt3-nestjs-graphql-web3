import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereInput } from './sprint-where.input';
import { Type } from 'class-transformer';
import { SprintOrderByWithAggregationInput } from './sprint-order-by-with-aggregation.input';
import { SprintScalarFieldEnum } from './sprint-scalar-field.enum';
import { SprintScalarWhereWithAggregatesInput } from './sprint-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { SprintCountAggregateInput } from './sprint-count-aggregate.input';
import { SprintAvgAggregateInput } from './sprint-avg-aggregate.input';
import { SprintSumAggregateInput } from './sprint-sum-aggregate.input';
import { SprintMinAggregateInput } from './sprint-min-aggregate.input';
import { SprintMaxAggregateInput } from './sprint-max-aggregate.input';

@ArgsType()
export class SprintGroupByArgs {

    @Field(() => SprintWhereInput, {nullable:true})
    @Type(() => SprintWhereInput)
    where?: SprintWhereInput;

    @Field(() => [SprintOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<SprintOrderByWithAggregationInput>;

    @Field(() => [SprintScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof SprintScalarFieldEnum>;

    @Field(() => SprintScalarWhereWithAggregatesInput, {nullable:true})
    having?: SprintScalarWhereWithAggregatesInput;

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
