import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintCreateInput } from './sprint-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneSprintArgs {

    @Field(() => SprintCreateInput, {nullable:false})
    @Type(() => SprintCreateInput)
    data!: SprintCreateInput;
}
