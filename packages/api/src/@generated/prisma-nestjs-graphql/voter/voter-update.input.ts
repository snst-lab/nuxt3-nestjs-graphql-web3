import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { NullableFloatFieldUpdateOperationsInput } from '../prisma/nullable-float-field-update-operations.input';

@InputType()
export class VoterUpdateInput {

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    project_id?: NullableIntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    evm_address?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    secret?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableFloatFieldUpdateOperationsInput, {nullable:true})
    max_voteable?: NullableFloatFieldUpdateOperationsInput;

    @Field(() => NullableFloatFieldUpdateOperationsInput, {nullable:true})
    pending_airdrop?: NullableFloatFieldUpdateOperationsInput;

    @Field(() => NullableFloatFieldUpdateOperationsInput, {nullable:true})
    pending_reconcile?: NullableFloatFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    mock_follow_project_id?: NullableIntFieldUpdateOperationsInput;

    @Field(() => NullableFloatFieldUpdateOperationsInput, {nullable:true})
    reward?: NullableFloatFieldUpdateOperationsInput;
}
