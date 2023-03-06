import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class TicketAvgAggregate {

    @Field(() => Float, {nullable:true})
    ticket_id?: number;

    @Field(() => Float, {nullable:true})
    ticket_code?: number;

    @Field(() => Float, {nullable:true})
    project_id?: number;

    @Field(() => Float, {nullable:true})
    type?: number;

    @Field(() => Float, {nullable:true})
    contributor_id?: number;

    @Field(() => Float, {nullable:true})
    sprint_id?: number;

    @Field(() => Float, {nullable:true})
    status?: number;
}
