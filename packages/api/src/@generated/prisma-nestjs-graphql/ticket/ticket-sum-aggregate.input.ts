import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class TicketSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    ticket_id?: true;

    @Field(() => Boolean, {nullable:true})
    ticket_code?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    type?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_id?: true;

    @Field(() => Boolean, {nullable:true})
    sprint_id?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;
}
