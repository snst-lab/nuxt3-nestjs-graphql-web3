import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereInput } from './reset-where.input';
import { Type } from 'class-transformer';
import { ResetOrderByWithRelationInput } from './reset-order-by-with-relation.input';
import { ResetWhereUniqueInput } from './reset-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ResetScalarFieldEnum } from './reset-scalar-field.enum';

@ArgsType()
export class FindFirstResetArgs {

    @Field(() => ResetWhereInput, {nullable:true})
    @Type(() => ResetWhereInput)
    where?: ResetWhereInput;

    @Field(() => [ResetOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ResetOrderByWithRelationInput>;

    @Field(() => ResetWhereUniqueInput, {nullable:true})
    cursor?: ResetWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ResetScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ResetScalarFieldEnum>;
}
