import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardWhereUniqueInput } from './address-card-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueAddressCardOrThrowArgs {

    @Field(() => AddressCardWhereUniqueInput, {nullable:false})
    @Type(() => AddressCardWhereUniqueInput)
    where!: AddressCardWhereUniqueInput;
}
