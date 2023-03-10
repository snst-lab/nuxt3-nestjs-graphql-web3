import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerWhereInput } from '../project-ledger/project-ledger-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyProjectLedgerArgs {

    @Field(() => Project_ledgerWhereInput, {nullable:true})
    @Type(() => Project_ledgerWhereInput)
    where?: Project_ledgerWhereInput;
}
