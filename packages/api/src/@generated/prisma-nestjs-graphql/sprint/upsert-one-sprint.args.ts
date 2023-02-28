import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereUniqueInput } from './sprint-where-unique.input';
import { Type } from 'class-transformer';
import { SprintCreateInput } from './sprint-create.input';
import { SprintUpdateInput } from './sprint-update.input';

@ArgsType()
export class UpsertOneSprintArgs {

    @Field(() => SprintWhereUniqueInput, {nullable:false})
    @Type(() => SprintWhereUniqueInput)
    where!: SprintWhereUniqueInput;

    @Field(() => SprintCreateInput, {nullable:false})
    @Type(() => SprintCreateInput)
    create!: SprintCreateInput;

    @Field(() => SprintUpdateInput, {nullable:false})
    @Type(() => SprintUpdateInput)
    update!: SprintUpdateInput;
}
