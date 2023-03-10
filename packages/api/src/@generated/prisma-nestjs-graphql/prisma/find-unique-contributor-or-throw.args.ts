import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereUniqueInput } from '../contributor/contributor-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueContributorOrThrowArgs {

    @Field(() => ContributorWhereUniqueInput, {nullable:false})
    @Type(() => ContributorWhereUniqueInput)
    where!: ContributorWhereUniqueInput;
}
