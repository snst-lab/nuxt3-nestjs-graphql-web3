import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_ledgerMinAggregate {

    @Field(() => Int, {nullable:true})
    index?: number;

    @Field(() => String, {nullable:true})
    contributor_code?: string;

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:true})
    target?: number;

    @Field(() => Float, {nullable:true})
    income?: number;

    @Field(() => Float, {nullable:true})
    expense?: number;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
