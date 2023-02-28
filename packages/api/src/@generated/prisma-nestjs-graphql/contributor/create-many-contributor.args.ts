import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorCreateManyInput } from './contributor-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyContributorArgs {

    @Field(() => [ContributorCreateManyInput], {nullable:false})
    @Type(() => ContributorCreateManyInput)
    data!: Array<ContributorCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
