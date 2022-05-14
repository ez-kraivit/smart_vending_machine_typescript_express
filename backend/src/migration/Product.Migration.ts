import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn  } from "typeorm";

import MedalMachineMigration from "./MedalMachine.Migration";

@Entity('product')
export default class ProductMigration  {
    @PrimaryColumn({ length:15})
    _pid: string;

    @Column({ length:'255',nullable: true})
    _mpid: string;
    
    @ManyToOne(() => MedalMachineMigration , medal_machine => medal_machine._mid) @JoinColumn({ name: "_mid" , referencedColumnName: "_mid" })
    _mid: MedalMachineMigration | null;
    
    @Column({ length:'255',nullable: true})
    topic: string;

    @Column({ length:'255',nullable: true})
    subject: string;

    @Column({ type:'text',nullable: true})
    descript: string;

    @Column({ length:'255',nullable: true})
    image_path: string;

    @Column({ type:'json',nullable: true})
    tags: string[];

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    cost_price: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    selling_price: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    point: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    qty: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    stock: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    stock_warning: number;

    @Column({ type: 'boolean', default: false  })
    is_view: boolean;

    @Column({ type: 'boolean', default: false  })
    is_delete: boolean;

    @Column({ type: 'boolean', default: false  })
    twoFactor: boolean;

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

