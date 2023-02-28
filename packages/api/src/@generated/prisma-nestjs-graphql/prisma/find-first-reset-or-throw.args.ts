import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereInput } from '../reset/reset-where.input';
import { Type } from 'class-transformer';
import { ResetOrderByWithRelationInput } from '../reset/reset-order-by-with-relation.input';
import { ResetWhereUniqueInput } from '../reset/reset-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ResetScalarFieldEnum } from '../reset/reset-scalar-field.enum';

@ArgsType()
export class FindFirstResetOrThrowArgs {

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
