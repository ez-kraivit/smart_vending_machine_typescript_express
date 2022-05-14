import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , ManyToOne, JoinColumn  } from "typeorm";

import MedalMachineMigration from "./MedalMachine.Migration";
import TransactionOrderMigration from "./TransactionOrder.Migration";

@Entity('deposit')
export default class DepositMigration  {
    @PrimaryColumn({ length:15})
    _did?: string;

    @ManyToOne(() => MedalMachineMigration , medal_machine => medal_machine._mid ,{ nullable:false }) @JoinColumn({ name: "_mid" , referencedColumnName: "_mid" })
    _mid?: MedalMachineMigration | null;

    @ManyToOne(() => TransactionOrderMigration , transaction_order => transaction_order._tid ,{ nullable:false }) @JoinColumn({ name: "_tid" , referencedColumnName: "_tid" })
    _tid?: TransactionOrderMigration | null;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0  })
    balance?: number;
    
    @Column({ length:'10' ,nullable: true})
    phone?: string;

    @Column({ type: 'boolean', default: false  })
    is_return?: boolean;

    @Column({ type: 'boolean', default: false  })
    is_payment?: boolean;

    @Column({ type: "timestamp" , nullable: true })
    payment_at?: Date;

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

