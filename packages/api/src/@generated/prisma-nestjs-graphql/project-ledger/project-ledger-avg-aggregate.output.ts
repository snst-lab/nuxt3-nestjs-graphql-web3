import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Project_ledgerAvgAggregate {

    @Field(() => Float, {nullable:true})
    index?: number;

    @Field(() => Float, {nullable:true})
    project_id?: number;

    @Field(() => Float, {nullable:true})
    target?: number;

    @Field(() => Float, {nullable:true})
    income?: number;

    @Field(() => Float, {nullable:true})
    expense?: number;
}
