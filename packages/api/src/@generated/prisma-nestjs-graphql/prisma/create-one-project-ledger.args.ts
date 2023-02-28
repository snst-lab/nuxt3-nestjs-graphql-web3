import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerCreateInput } from '../project-ledger/project-ledger-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProjectLedgerArgs {

    @Field(() => Project_ledgerCreateInput, {nullable:false})
    @Type(() => Project_ledgerCreateInput)
    data!: Project_ledgerCreateInput;
}
