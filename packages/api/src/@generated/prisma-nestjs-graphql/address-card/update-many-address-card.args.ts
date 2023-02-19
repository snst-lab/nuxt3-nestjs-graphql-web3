import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardUpdateManyMutationInput } from './address-card-update-many-mutation.input';
import { Type } from 'class-transformer';
import { AddressCardWhereInput } from './address-card-where.input';

@ArgsType()
export class UpdateManyAddressCardArgs {

    @Field(() => AddressCardUpdateManyMutationInput, {nullable:false})
    @Type(() => AddressCardUpdateManyMutationInput)
    data!: AddressCardUpdateManyMutationInput;

    @Field(() => AddressCardWhereInput, {nullable:true})
    @Type(() => AddressCardWhereInput)
    where?: AddressCardWhereInput;
}
