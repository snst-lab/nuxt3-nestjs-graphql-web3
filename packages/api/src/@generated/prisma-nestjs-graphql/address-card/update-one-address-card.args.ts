import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardUpdateInput } from './address-card-update.input';
import { Type } from 'class-transformer';
import { AddressCardWhereUniqueInput } from './address-card-where-unique.input';

@ArgsType()
export class UpdateOneAddressCardArgs {

    @Field(() => AddressCardUpdateInput, {nullable:false})
    @Type(() => AddressCardUpdateInput)
    data!: AddressCardUpdateInput;

    @Field(() => AddressCardWhereUniqueInput, {nullable:false})
    @Type(() => AddressCardWhereUniqueInput)
    where!: AddressCardWhereUniqueInput;
}
