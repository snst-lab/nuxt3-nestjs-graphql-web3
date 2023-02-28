import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerUpdateManyMutationInput } from '../project-ledger/project-ledger-update-many-mutation.input';
import { Type } from 'class-transformer';
import { Project_ledgerWhereInput } from '../project-ledger/project-ledger-where.input';

@ArgsType()
export class UpdateManyProjectLedgerArgs {

    @Field(() => Project_ledgerUpdateManyMutationInput, {nullable:false})
    @Type(() => Project_ledgerUpdateManyMutationInput)
    data!: Project_ledgerUpdateManyMutationInput;

    @Field(() => Project_ledgerWhereInput, {nullable:true})
    @Type(() => Project_ledgerWhereInput)
    where?: Project_ledgerWhereInput;
}
