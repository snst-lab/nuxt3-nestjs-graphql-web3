import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintUpdateManyMutationInput } from './sprint-update-many-mutation.input';
import { Type } from 'class-transformer';
import { SprintWhereInput } from './sprint-where.input';

@ArgsType()
export class UpdateManySprintArgs {

    @Field(() => SprintUpdateManyMutationInput, {nullable:false})
    @Type(() => SprintUpdateManyMutationInput)
    data!: SprintUpdateManyMutationInput;

    @Field(() => SprintWhereInput, {nullable:true})
    @Type(() => SprintWhereInput)
    where?: SprintWhereInput;
}
