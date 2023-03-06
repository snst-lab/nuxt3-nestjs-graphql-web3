import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectSumAggregate {

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:true})
    service_id?: number;

    @Field(() => Int, {nullable:true})
    project_code?: number;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Int, {nullable:true})
    contributor_count?: number;

    @Field(() => Int, {nullable:true})
    minimum_contributor_count?: number;
}
