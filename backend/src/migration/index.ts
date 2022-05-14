import DepositMigration from "./Deposit.Migration"
import WithdrawMigration from "./Withdraw.Migration"
import MedalMachineMigration from "./MedalMachine.Migration"
import EmployeeMigration from "./Employee.Migration"
import HistoryEmailForgotPasswordMigration from "./HistoryEmailForgotPassword.Migration"
import TransactionOrderMigration from "./TransactionOrder.Migration"
import DrawerMigration from "./Drawer.Migration"
import DrawerHistoryMigration from "./DrawerHistory.Migration"
import PointMigration from "./Point.Migration"
import MasterProductMigration from "./MasterProduct.Migration"
import ProductMigration from "./Product.Migration"
import CustomerMigration from "./Customer.Migration"

export default [
    CustomerMigration,
    EmployeeMigration,
    MasterProductMigration,
    MedalMachineMigration,

    DrawerHistoryMigration,
    TransactionOrderMigration,
    HistoryEmailForgotPasswordMigration,
    DepositMigration,
    WithdrawMigration,
    PointMigration,
    ProductMigration,
    DrawerMigration,
]