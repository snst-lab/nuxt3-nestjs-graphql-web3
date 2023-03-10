import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ContributorWhereInput } from './contributor-where.input';
import { Type } from 'class-transformer';
import { ContributorOrderByWithRelationInput } from './contributor-order-by-with-relation.input';
import { ContributorWhereUniqueInput } from './contributor-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ContributorScalarFieldEnum } from './contributor-scalar-field.enum';

@ArgsType()
export class FindManyContributorArgs {

    @Field(() => ContributorWhereInput, {nullable:true})
    @Type(() => ContributorWhereInput)
    where?: ContributorWhereInput;

    @Field(() => [ContributorOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ContributorOrderByWithRelationInput>;

    @Field(() => ContributorWhereUniqueInput, {nullable:true})
    cursor?: ContributorWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ContributorScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ContributorScalarFieldEnum>;
}
