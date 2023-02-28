import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_ledgerCountAggregate {

    @Field(() => Int, {nullable:false})
    index!: number;

    @Field(() => Int, {nullable:false})
    contributor_code!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    target!: number;

    @Field(() => Int, {nullable:false})
    income!: number;

    @Field(() => Int, {nullable:false})
    expense!: number;

    @HideField()
    created_at!: number;

    @HideField()
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
