import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , ManyToOne, JoinColumn  } from "typeorm";

import MedalMachineMigration from "./MedalMachine.Migration";
import CustomerMigration from "./Customer.Migration";

@Entity('transaction_order')
export default class TransactionOrderMigration  {
    @PrimaryColumn({ length:15})
    _tid: string;

    @ManyToOne(() => MedalMachineMigration , medal_machine => medal_machine._mid) @JoinColumn({ name: "_mid" , referencedColumnName: "_mid" })
    _mid: MedalMachineMigration | null;

    @ManyToOne(() => CustomerMigration , customer => customer._cid) @JoinColumn({ name: "_cid" , referencedColumnName: "_cid" })
    _cid: CustomerMigration | null;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    discount: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    total: number; /** ราคาทั้งหมด */

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    balance: number; /** เงิน ณ ตอนนี้ */
    
    @Column({ type:'text' ,nullable: true})
    note: string

    @Column({ type:'json' ,nullable: true , default : [] })
    drawer_order: string[];

    @Column({ type:'json' ,nullable: true  , default : []})
    deposit_order: string[];

    @Column({ type:'json' ,nullable: true  , default : []})
    product_order: string[];

    @Column({ type: 'boolean', default: false  })
    is_payment: boolean;

    @Column({ type: 'boolean', default: false  })
    is_refund: boolean;
    
    @Column({ type: 'boolean', default: false  })
    is_delete: boolean;

    @Column({ type: "timestamp" , nullable: true })
    payment_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column({ length: 100, nullable: true })
    created_by: string;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @Column({ length: 100, nullable: true })
    updated_by: string;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;
}

