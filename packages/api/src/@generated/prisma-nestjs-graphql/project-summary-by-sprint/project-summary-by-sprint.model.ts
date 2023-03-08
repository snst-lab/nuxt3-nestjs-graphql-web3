import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_summary_by_sprint {

    @Field(() => ID, {nullable:false})
    index!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    sprint_id!: number;

    @Field(() => Float, {nullable:false,defaultValue:0})
    project_amount!: number;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
