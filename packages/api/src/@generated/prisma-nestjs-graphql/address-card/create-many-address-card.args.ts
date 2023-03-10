import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardCreateManyInput } from './address-card-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyAddressCardArgs {

    @Field(() => [AddressCardCreateManyInput], {nullable:false})
    @Type(() => AddressCardCreateManyInput)
    data!: Array<AddressCardCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
