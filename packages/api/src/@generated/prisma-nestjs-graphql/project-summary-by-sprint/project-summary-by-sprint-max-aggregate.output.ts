import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_summary_by_sprintMaxAggregate {

    @Field(() => Int, {nullable:true})
    index?: number;

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:true})
    sprint_id?: number;

    @Field(() => Float, {nullable:true})
    project_amount?: number;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
