import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardWhereInput } from './address-card-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyAddressCardArgs {

    @Field(() => AddressCardWhereInput, {nullable:true})
    @Type(() => AddressCardWhereInput)
    where?: AddressCardWhereInput;
}
