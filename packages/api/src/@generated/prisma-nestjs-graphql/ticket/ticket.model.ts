import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Ticket {

    @Field(() => ID, {nullable:false})
    ticket_id!: number;

    @Field(() => Int, {nullable:false})
    ticket_code!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    type!: number;

    @Field(() => Int, {nullable:true})
    contributor_id!: number | null;

    @Field(() => Int, {nullable:true})
    sprint_id!: number | null;

    @Field(() => Int, {nullable:true})
    status!: number | null;

    @Field(() => Date, {nullable:true})
    start_date!: Date | null;

    @Field(() => Date, {nullable:true})
    end_date!: Date | null;

    @Field(() => Date, {nullable:true})
    complete_date!: Date | null;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
