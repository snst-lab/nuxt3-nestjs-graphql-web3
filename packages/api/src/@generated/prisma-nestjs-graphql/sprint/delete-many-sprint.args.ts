import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereInput } from './sprint-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManySprintArgs {

    @Field(() => SprintWhereInput, {nullable:true})
    @Type(() => SprintWhereInput)
    where?: SprintWhereInput;
}
