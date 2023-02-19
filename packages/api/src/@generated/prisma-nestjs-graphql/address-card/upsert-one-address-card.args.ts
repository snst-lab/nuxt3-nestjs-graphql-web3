import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardWhereUniqueInput } from './address-card-where-unique.input';
import { Type } from 'class-transformer';
import { AddressCardCreateInput } from './address-card-create.input';
import { AddressCardUpdateInput } from './address-card-update.input';

@ArgsType()
export class UpsertOneAddressCardArgs {

    @Field(() => AddressCardWhereUniqueInput, {nullable:false})
    @Type(() => AddressCardWhereUniqueInput)
    where!: AddressCardWhereUniqueInput;

    @Field(() => AddressCardCreateInput, {nullable:false})
    @Type(() => AddressCardCreateInput)
    create!: AddressCardCreateInput;

    @Field(() => AddressCardUpdateInput, {nullable:false})
    @Type(() => AddressCardUpdateInput)
    update!: AddressCardUpdateInput;
}
