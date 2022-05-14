import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn  } from "typeorm";

@Entity('medal_machine')
export default class MedalMachineMigration  {
    @PrimaryColumn({  length:15})
    _mid: string;

    @Column({ length:'15',nullable: true})
    _eid: string;
    
    @Column({ length:'255',nullable: true})
    theme: string;

    @Column({ length:'255',nullable: true})
    name: string;

    @Column({ type:'text',nullable: true})
    note: string;

    @Column({ length:'100',nullable: true})
    lati_tude: string;

    @Column({ length:'100',nullable: true})
    long_tude: string;

    @Column({ length:'255',nullable: true})
    cereal_id: string;

    @Column({ type: 'boolean', default: false  })
    is_verify: boolean;

    @Column({ type: 'boolean', default: false  })
    is_delete: boolean;

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

