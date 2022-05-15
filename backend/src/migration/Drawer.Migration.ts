import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , OneToOne, JoinColumn  } from "typeorm";

import MedalMachineMigration from "./MedalMachine.Migration";

@Entity('drawer')
export default class DrawerMigration  {
    @PrimaryColumn({ length:15})
    _dwid?: string;

    @OneToOne(() => MedalMachineMigration , medal_machine => medal_machine._mid) @JoinColumn({ name: "_mid" , referencedColumnName: "_mid" })
    _mid?: MedalMachineMigration | null;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    balance: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    one_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    two_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    five_coin?: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    ten_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    twenty_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    fifty_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    one_hundred_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    five_hundred_coin?: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    one_thosand_coin?: number;
    
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

