import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereInput } from './voter-where.input';
import { Type } from 'class-transformer';
import { VoterOrderByWithRelationInput } from './voter-order-by-with-relation.input';
import { VoterWhereUniqueInput } from './voter-where-unique.input';
import { Int } from '@nestjs/graphql';
import { VoterScalarFieldEnum } from './voter-scalar-field.enum';

@ArgsType()
export class FindManyVoterArgs {

    @Field(() => VoterWhereInput, {nullable:true})
    @Type(() => VoterWhereInput)
    where?: VoterWhereInput;

    @Field(() => [VoterOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VoterOrderByWithRelationInput>;

    @Field(() => VoterWhereUniqueInput, {nullable:true})
    cursor?: VoterWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [VoterScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof VoterScalarFieldEnum>;
}
