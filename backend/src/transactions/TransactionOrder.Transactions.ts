import { DataSource } from "typeorm";
import RandomId from "../plugins/RandomId"
import Bigjs from "../plugins/Big";

import DepositMigration from "../migration/Deposit.Migration";
import TransactionOrderMigration from "../migration/TransactionOrder.Migration";
import DepositRepository from "../repositorys/Deposit.Repository";

export default class TransactionOrderTransactions {
    private manager: DataSource
    
    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
    }

    async depositInTransaction(deposit:{[I:string]:string|boolean|number}){
        return await this.manager.transaction(async (transactionalManager:any) => {
            deposit._did = RandomId.generateid('base62', 15)
            await transactionalManager.insert(DepositMigration,deposit)
            let currentTransactionOrder = await transactionalManager.findOne(TransactionOrderMigration,{where:{_tid:deposit._tid}})
            currentTransactionOrder.balance = new Bigjs().calculator(currentTransactionOrder.balance, "+", <number>deposit.balance).toNumber()
            currentTransactionOrder.drawer_order.push(deposit._did)
            await transactionalManager.save(TransactionOrderMigration,currentTransactionOrder)
        }).then((data)=>{
            return data
        })
    }

    async withdrawInTransaction(_tid:string){
        return await this.manager.transaction(async (transactionalManager:any) => {
            let currentTransactionOrder = await transactionalManager.findOne(TransactionOrderMigration,{where:{_tid,is_refund:false,is_delete:false,is_payment:false}})
            if(!currentTransactionOrder.is_refund){
                await new DepositRepository(this.manager).updateAll(_tid)
                currentTransactionOrder.is_refund = true
                await transactionalManager.save(TransactionOrderMigration,currentTransactionOrder)
            }
        }).then((data)=>{
            return data
        })
    }

}