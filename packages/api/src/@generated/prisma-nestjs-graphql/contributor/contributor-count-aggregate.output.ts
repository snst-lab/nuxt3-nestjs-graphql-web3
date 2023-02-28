import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class ContributorCountAggregate {

    @Field(() => Int, {nullable:false})
    contributor_id!: number;

    @Field(() => Int, {nullable:false})
    contributor_code!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @HideField()
    created_at!: number;

    @HideField()
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
