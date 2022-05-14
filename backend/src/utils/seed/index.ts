import * as fs from "fs"
import * as path from "path"
import { DataSource } from "typeorm";

import Bcrypts from "../../plugins/Bcrypt";
import Typeorm from "../../plugins/TypeOrmConnection"

import Employee from "../../repositorys/Employee.Repository"
import Customer from "../../repositorys/Customer.Repository"
import MedalMachine from "../../repositorys/MedalMachine.Repository"
import Drawer from "../../repositorys/Drawer.Repository"
import ProductRepository from "../../repositorys/Product.Repository";
import MasterProductRepository from "../../repositorys/MasterProduct.Repository";

import { T } from "../../declarations/Seed.Type"
import config from "../../cores/Base.Env.Interface"

let dataSource: DataSource

const main = async () => {
    dataSource = await Typeorm(config.dataBase)
    await (dataSource).initialize()

    /** Employee Seed */
    let employeeMockup = JSON.parse(<T>fs.readFileSync(`${path.resolve(__dirname, './mockup/employee.json')}`))
    employeeMockup = await Bcrypts.genPasswordArray(employeeMockup)
    await new Employee(dataSource).update(employeeMockup)

    /** Customer Seed */
    let customerMockup = JSON.parse(<T>fs.readFileSync(`${path.resolve(__dirname, './mockup/customer.json')}`))
    customerMockup = await Bcrypts.genPasswordArray(customerMockup)
    await new Customer(dataSource).update(customerMockup)

    /** MedalMachine Seed */
    const medalmachineMockup = JSON.parse(<T>fs.readFileSync(`${path.resolve(__dirname, './mockup/medalmachine.json')}`))
    await new MedalMachine(dataSource).update(medalmachineMockup)

    /** Drawer Seed */
    const drawer = JSON.parse(<T>fs.readFileSync(`${path.resolve(__dirname, './mockup/drawer.json')}`))
    await new Drawer(dataSource).update(drawer)

    /** Master Product Seed */
    const masterproduct = JSON.parse(<T>fs.readFileSync(`${path.resolve(__dirname, './mockup/masterproduct.json')}`))
    await new MasterProductRepository(dataSource).update(masterproduct)

    /** Product Seed */
    const product = JSON.parse(<T>fs.readFileSync(`${path.resolve(__dirname, './mockup/product.json')}`))
    await new ProductRepository(dataSource).update(product)
}
main()