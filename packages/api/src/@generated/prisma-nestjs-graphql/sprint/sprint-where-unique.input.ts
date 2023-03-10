import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class SprintWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    sprint_id?: number;
}
