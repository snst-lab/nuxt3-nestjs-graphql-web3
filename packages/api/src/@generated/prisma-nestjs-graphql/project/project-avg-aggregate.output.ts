import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ProjectAvgAggregate {

    @Field(() => Float, {nullable:true})
    project_id?: number;

    @Field(() => Float, {nullable:true})
    service_id?: number;

    @Field(() => Float, {nullable:true})
    project_code?: number;

    @Field(() => Float, {nullable:true})
    status?: number;

    @Field(() => Float, {nullable:true})
    contributor_count?: number;

    @Field(() => Float, {nullable:true})
    minimum_contributor_count?: number;

    @Field(() => Float, {nullable:true})
    voted_amount?: number;

    @Field(() => Float, {nullable:true})
    invested_amount?: number;
}
