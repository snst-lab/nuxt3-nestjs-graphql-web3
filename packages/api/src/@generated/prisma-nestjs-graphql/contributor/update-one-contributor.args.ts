import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorUpdateInput } from './contributor-update.input';
import { Type } from 'class-transformer';
import { ContributorWhereUniqueInput } from './contributor-where-unique.input';

@ArgsType()
export class UpdateOneContributorArgs {

    @Field(() => ContributorUpdateInput, {nullable:false})
    @Type(() => ContributorUpdateInput)
    data!: ContributorUpdateInput;

    @Field(() => ContributorWhereUniqueInput, {nullable:false})
    @Type(() => ContributorWhereUniqueInput)
    where!: ContributorWhereUniqueInput;
}
