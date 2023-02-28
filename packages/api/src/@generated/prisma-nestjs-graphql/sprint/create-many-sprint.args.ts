import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintCreateManyInput } from './sprint-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManySprintArgs {

    @Field(() => [SprintCreateManyInput], {nullable:false})
    @Type(() => SprintCreateManyInput)
    data!: Array<SprintCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
