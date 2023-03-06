import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class NestedBytesFilter {

    @Field(() => String, {nullable:true})
    equals?: Buffer;

    @Field(() => [String], {nullable:true})
    in?: Array<Buffer>;

    @Field(() => [String], {nullable:true})
    notIn?: Array<Buffer>;

    @Field(() => NestedBytesFilter, {nullable:true})
    not?: NestedBytesFilter;
}
