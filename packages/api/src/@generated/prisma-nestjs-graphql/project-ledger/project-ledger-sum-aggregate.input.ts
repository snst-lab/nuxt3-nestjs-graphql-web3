import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class Project_ledgerSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    index?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    target?: true;

    @Field(() => Boolean, {nullable:true})
    income?: true;

    @Field(() => Boolean, {nullable:true})
    expense?: true;
}
