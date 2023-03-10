import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class Project_detailWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    index?: number;
}
