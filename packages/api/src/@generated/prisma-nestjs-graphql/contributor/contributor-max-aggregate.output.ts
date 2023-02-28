import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class ContributorMaxAggregate {

    @Field(() => Int, {nullable:true})
    contributor_id?: number;

    @Field(() => String, {nullable:true})
    contributor_code?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
