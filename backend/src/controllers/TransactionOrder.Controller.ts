import { Request, Response, NextFunction } from 'express'

import ProductRepository from '../repositorys/Product.Repository';
import { dataSource } from '../utils/ExpressServer';
import TransactionOrderRepository from "../repositorys/TransactionOrder.Repository"
import DrawerRepository from '../repositorys/Drawer.Repository';
import Bigjs from "../plugins/Big";

import RandomId from "../plugins/RandomId"

export interface ITransactionOrderController {
    getLists():Promise<void>;
    insert():Promise<void>;
    update():Promise<void>;
    delete():Promise<void>;
}



export default {
    name: 'TransactionOrderController',
    export: class TransactionOrderController implements ITransactionOrderController  {

        req: Request;
        res: Response;
        next:NextFunction;

        body: { [I: string]: string } | { is_payment?: boolean, _tid?: string , product_order?:any , total?:number };
        query: { [I: string]: string | number | undefined | null | never | Object };
        parame: { [I: string]: string };

        constructor(req: Request, res: Response,next:NextFunction) {
            this.res = res;
            this.req = req;
            this.body = req.body;
            this.query = req.query;
            this.parame = req.params;
            this.next = next;
        }

        async getLists(): Promise<void> {
            const currentData = await new TransactionOrderRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async getBalance(): Promise<void> {
            const currentData = await new TransactionOrderRepository(dataSource).getBalance(<string>this.query.id)
            this.res.json({data: currentData || 0})
        }

        async checkPayment(): Promise<void> {
            let message = { data:<Object|null>null, message: 'Insert TransactionOrder Fail!', error: <null|string>null }
            const currentData = await new TransactionOrderRepository(dataSource).getCheck(<string>this.body._tid)
            let drawer:any = await new DrawerRepository(dataSource).get(<any>currentData._mid)
            if(currentData.balance > currentData.total){
                const cutDrawerLength = (data:any) => {
                    let count = 0
                    let numpay:any = []
                    Object.keys(data).forEach((item)=>{
                        if(item === "one_thosand_coin" && data["one_thosand_coin"] > 0 ) {
                            numpay.push(1000)
                            count++;
                        }
                        if(item === "five_hundred_coin" && data["five_hundred_coin"] > 0 ) {
                            numpay.push(500)
                            count++;
                        }
                        if(item === "one_hundred_coin" && data["one_hundred_coin"] > 0 ) {
                            numpay.push(100)
                            count++;
                        }
                        if(item === "fifty_coin" && data["fifty_coin"] > 0 ) {
                            numpay.push(50)
                            count++;
                        }
                        if(item === "twenty_coin" && data["twenty_coin"] > 0 ) {
                            numpay.push(20)
                            count++;
                        }
                        if(item === "ten_coin" && data["ten_coin"] > 0 ) {
                            numpay.push(10)
                            count++;
                        }
                        if(item === "five_coin" && data["five_coin"] > 0 ) {
                            numpay.push(5)
                            count++;
                        }
                        if(item === "two_coin" && data["two_coin"] > 0 ) {
                            numpay.push(2)
                            count++;
                        }
                        if(item === "one_coin" && data["one_coin"] > 0 ) {
                            numpay.push(1)
                            count++;
                        }
                    })
                    if(numpay[0] === 1) numpay = numpay.reverse()
                    
                    let money =  new Bigjs().calculator(currentData.balance, "-", currentData.total).toNumber()
                    let pay =  new Array(count);
                    let cancel = false
                    let balance = 0
                    let pay_lists:any = {};
                    for (let i = 0; i < pay.length; i++) {
                        if(numpay[i]===1000) {
                            pay_lists.one_thosand_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===500) {
                            pay_lists.five_hundred_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===100) {
                            pay_lists.one_hundred_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===50) {
                            pay_lists.fifty_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===20) {
                            pay_lists.twenty_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===10) {
                            pay_lists.ten_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===5) {
                            pay_lists.five_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===2) {
                            pay_lists.two_coin = Math.floor(money/numpay[i])
                        }
                        if(numpay[i]===1) {
                            pay_lists.one_coin = Math.floor(money/numpay[i])
                        }
                        pay[i] = Math.floor(money/numpay[i]);
                        money = money%numpay[i];
                    }
                    Object.keys(pay_lists).forEach((item)=>{
                        Object.keys(drawer).map((index)=>{
                            if(item === index) {
                                drawer[index] = drawer[index] - pay_lists[item];
                            }
                            return index
                        })
                        if(item === 'one_thosand_coin') { 
                            balance += drawer[item]*1000
                            if(balance < 0) cancel = true
                        }
                        if(item === 'five_hundred_coin') { 
                            balance += drawer[item]*500
                            if(balance < 0) cancel = true
                        }
                        if(item === 'one_hundred_coin') { 
                            balance += drawer[item]*100
                            if(balance < 0) cancel = true
                        }
                        if(item === 'fifty_coin') { 
                            balance += drawer[item]*50
                            if(balance < 0) cancel = true
                        }
                        if(item === 'twenty_coin') { 
                            balance += drawer[item]*20
                            if(balance < 0) cancel = true
                        }
                        if(item === 'ten_coin') { 
                            balance += drawer[item]*10
                            if(balance < 0) cancel = true
                        }
                        if(item === 'five_coin') { 
                            balance += drawer[item]*5
                            if(balance < 0) cancel = true
                        }
                        if(item === 'two_coin') { 
                            balance += drawer[item]*2
                            if(balance < 0) cancel = true
                        }
                        if(item === 'one_coin') { 
                            balance += drawer[item]*1
                            if(balance < 0) cancel = true
                        }
                        drawer['balance'] = balance
                    })
                    return cancel ? {cancel:true} : {cancel:false, drawer:drawer, pay_lists}
                }
                const currentDrawer = cutDrawerLength(drawer)
                if(currentDrawer.cancel) {
                    message = { data:null, message: '', error: 'Insufficient balance!' }
                    this.res.json(message)
                }
                else {
                    currentData.drawer_order = currentDrawer.pay_lists
                    currentData.is_payment = true
                    currentData.payment_at = new Date()
                    await new TransactionOrderRepository(dataSource).update(<{[I:string]:any}>currentData);
                    await new DrawerRepository(dataSource).update(currentDrawer.drawer);
                    message = { data:currentDrawer.pay_lists, message: 'Transaction paid successfully!' , error: null }
                }
            }
            if(currentData.balance === currentData.total){
                currentData.is_payment = true
                currentData.payment_at = new Date()
                await new TransactionOrderRepository(dataSource).update(<{[I:string]:any}>currentData);
                message = { data:null,message: 'Insert TransactionOrder Success!', error: null }
            }
            this.res.json(message)
        }


        async insert(): Promise<void> {
            try {
                this.body.is_payment = false;
                this.body._tid = `${RandomId.generateid('base62', 15)}`;
                const currentProduct = await new ProductRepository(dataSource).get(<string>this.body.product_order[0])
                this.body.total = currentProduct.selling_price;
                await new TransactionOrderRepository(dataSource).insert(this.body)
                const message = { data:this.body._tid , message: 'Insert TransactionOrder Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert TransactionOrder Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                await new TransactionOrderRepository(dataSource).update(<any>this.body)
                const message = { message: 'Update TransactionOrder Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update TransactionOrder Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new TransactionOrderRepository(dataSource).update({ _tid: this.parame._tid, is_delete: true })
                const message = { message: 'Delete TransactionOrder Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete TransactionOrder Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}