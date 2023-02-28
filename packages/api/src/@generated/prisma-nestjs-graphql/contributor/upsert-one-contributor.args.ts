import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereUniqueInput } from './contributor-where-unique.input';
import { Type } from 'class-transformer';
import { ContributorCreateInput } from './contributor-create.input';
import { ContributorUpdateInput } from './contributor-update.input';

@ArgsType()
export class UpsertOneContributorArgs {

    @Field(() => ContributorWhereUniqueInput, {nullable:false})
    @Type(() => ContributorWhereUniqueInput)
    where!: ContributorWhereUniqueInput;

    @Field(() => ContributorCreateInput, {nullable:false})
    @Type(() => ContributorCreateInput)
    create!: ContributorCreateInput;

    @Field(() => ContributorUpdateInput, {nullable:false})
    @Type(() => ContributorUpdateInput)
    update!: ContributorUpdateInput;
}
