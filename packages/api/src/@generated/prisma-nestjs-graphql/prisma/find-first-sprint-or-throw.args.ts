import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereInput } from '../sprint/sprint-where.input';
import { Type } from 'class-transformer';
import { SprintOrderByWithRelationInput } from '../sprint/sprint-order-by-with-relation.input';
import { SprintWhereUniqueInput } from '../sprint/sprint-where-unique.input';
import { Int } from '@nestjs/graphql';
import { SprintScalarFieldEnum } from '../sprint/sprint-scalar-field.enum';

@ArgsType()
export class FindFirstSprintOrThrowArgs {

    @Field(() => SprintWhereInput, {nullable:true})
    @Type(() => SprintWhereInput)
    where?: SprintWhereInput;

    @Field(() => [SprintOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<SprintOrderByWithRelationInput>;

    @Field(() => SprintWhereUniqueInput, {nullable:true})
    cursor?: SprintWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [SprintScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof SprintScalarFieldEnum>;
}
