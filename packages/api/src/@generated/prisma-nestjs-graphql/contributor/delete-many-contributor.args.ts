import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereInput } from './contributor-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyContributorArgs {

    @Field(() => ContributorWhereInput, {nullable:true})
    @Type(() => ContributorWhereInput)
    where?: ContributorWhereInput;
}
