import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorCreateInput } from './contributor-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneContributorArgs {

    @Field(() => ContributorCreateInput, {nullable:false})
    @Type(() => ContributorCreateInput)
    data!: ContributorCreateInput;
}
