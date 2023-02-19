import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardCreateInput } from './address-card-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneAddressCardArgs {

    @Field(() => AddressCardCreateInput, {nullable:false})
    @Type(() => AddressCardCreateInput)
    data!: AddressCardCreateInput;
}
