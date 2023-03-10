import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintUpdateInput } from './sprint-update.input';
import { Type } from 'class-transformer';
import { SprintWhereUniqueInput } from './sprint-where-unique.input';

@ArgsType()
export class UpdateOneSprintArgs {

    @Field(() => SprintUpdateInput, {nullable:false})
    @Type(() => SprintUpdateInput)
    data!: SprintUpdateInput;

    @Field(() => SprintWhereUniqueInput, {nullable:false})
    @Type(() => SprintWhereUniqueInput)
    where!: SprintWhereUniqueInput;
}
