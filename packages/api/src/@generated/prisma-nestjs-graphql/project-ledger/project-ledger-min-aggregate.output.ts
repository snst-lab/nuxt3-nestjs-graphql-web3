import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_ledgerMinAggregate {

    @Field(() => Int, {nullable:true})
    index?: number;

    @Field(() => Date, {nullable:true})
    created_date?: Date | string;

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:true})
    target?: number;

    @Field(() => String, {nullable:true})
    unit?: string;

    @Field(() => Float, {nullable:true})
    income?: number;

    @Field(() => Float, {nullable:true})
    expense?: number;

    @Field(() => String, {nullable:true})
    review_phase?: string;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
