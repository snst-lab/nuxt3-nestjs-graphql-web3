import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class SprintCountAggregate {

    @Field(() => Int, {nullable:false})
    sprint_id!: number;

    @Field(() => Int, {nullable:false})
    sprint_code!: number;

    @Field(() => Int, {nullable:false})
    sprint_name!: number;

    @Field(() => Int, {nullable:false})
    start_date!: number;

    @Field(() => Int, {nullable:false})
    end_date!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @HideField()
    created_at!: number;

    @HideField()
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
