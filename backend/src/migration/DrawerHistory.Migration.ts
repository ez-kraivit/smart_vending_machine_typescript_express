import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , ManyToOne, JoinColumn  } from "typeorm";

import MedalMachineMigration from "./MedalMachine.Migration";
import DrawerMigration from "./Drawer.Migration";

@Entity('drawer_history')
export default class DrawerHistoryMigration  {
    @PrimaryColumn({ length:15})
    _hdwid: string;

    @ManyToOne(() => DrawerMigration , drawer => drawer._mid) @JoinColumn({ name: "_dwid" , referencedColumnName: "_dwid" })
    _dwid: DrawerMigration | null;

    @ManyToOne(() => MedalMachineMigration , medal_machine => medal_machine._mid) @JoinColumn({ name: "_mid" , referencedColumnName: "_mid" })
    _mid: MedalMachineMigration | null;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    balance: number;

    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    one_coin: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    two_coin: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    five_coin: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    twenty_coin: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    one_hundred_coin: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    five_hundred_coin: number;
    
    @Column({ type: 'decimal', precision: 22, scale: 2, default: 0   })
    one_thosand_coin: number;
    
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

