import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , ManyToOne, JoinColumn  } from "typeorm";

import CustomerMigration from "./Customer.Migration";
import MedalMachineMigration from "./MedalMachine.Migration";
import ProductMigration from "./Product.Migration";

@Entity('point')
export default class PointMigration  {
    @PrimaryColumn({  length:15})
    _poid: string;

    @ManyToOne(() => CustomerMigration , customer => customer._cid) @JoinColumn({ name: "_cid" , referencedColumnName: "_cid" })
    _cid: CustomerMigration | null;

    @ManyToOne(() => ProductMigration , product => product._pid) @JoinColumn({ name: "_pid" , referencedColumnName: "_pid" })
    _pid: ProductMigration | null;

    @ManyToOne(() => MedalMachineMigration , customer => customer._mid) @JoinColumn({ name: "_mid" , referencedColumnName: "_mid" })
    _mid: MedalMachineMigration | null;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    balance: number;

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

