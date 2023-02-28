import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class SprintAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    sprint_id?: true;

    @Field(() => Boolean, {nullable:true})
    sprint_code?: true;

    @Field(() => Boolean, {nullable:true})
    service_id?: true;
}
