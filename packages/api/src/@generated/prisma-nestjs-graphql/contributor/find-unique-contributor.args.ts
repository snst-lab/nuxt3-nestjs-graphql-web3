import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereUniqueInput } from './contributor-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueContributorArgs {

    @Field(() => ContributorWhereUniqueInput, {nullable:false})
    @Type(() => ContributorWhereUniqueInput)
    where!: ContributorWhereUniqueInput;
}
