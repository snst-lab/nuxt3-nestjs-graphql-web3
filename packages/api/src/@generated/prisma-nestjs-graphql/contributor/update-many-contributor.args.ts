import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorUpdateManyMutationInput } from './contributor-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ContributorWhereInput } from './contributor-where.input';

@ArgsType()
export class UpdateManyContributorArgs {

    @Field(() => ContributorUpdateManyMutationInput, {nullable:false})
    @Type(() => ContributorUpdateManyMutationInput)
    data!: ContributorUpdateManyMutationInput;

    @Field(() => ContributorWhereInput, {nullable:true})
    @Type(() => ContributorWhereInput)
    where?: ContributorWhereInput;
}
