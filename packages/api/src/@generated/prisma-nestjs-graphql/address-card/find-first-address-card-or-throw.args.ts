import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardWhereInput } from './address-card-where.input';
import { Type } from 'class-transformer';
import { AddressCardOrderByWithRelationInput } from './address-card-order-by-with-relation.input';
import { AddressCardWhereUniqueInput } from './address-card-where-unique.input';
import { Int } from '@nestjs/graphql';
import { AddressCardScalarFieldEnum } from './address-card-scalar-field.enum';

@ArgsType()
export class FindFirstAddressCardOrThrowArgs {

    @Field(() => AddressCardWhereInput, {nullable:true})
    @Type(() => AddressCardWhereInput)
    where?: AddressCardWhereInput;

    @Field(() => [AddressCardOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<AddressCardOrderByWithRelationInput>;

    @Field(() => AddressCardWhereUniqueInput, {nullable:true})
    cursor?: AddressCardWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [AddressCardScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof AddressCardScalarFieldEnum>;
}
