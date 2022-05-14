import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn  } from "typeorm";

@Entity('customer')
export default class CustomerMigration  {
    @PrimaryColumn({ length:15})
    _cid?: string;
    
    @Column({ length:'255',nullable: true})
    name?: string;

    @Column({ length:'255',nullable: true})
    lastname?: string;

    @Column({ unique:true,length:'10',nullable: true})
    phone?: string;

    @Column({ unique:true,length:'255',nullable: true})
    email?: string;

    @Column({ length:'255',nullable: true})
    username?: string;

    @Column({ length:'255',nullable: true , select:false})
    password?: string;

    @Column({ length:'255',nullable: true})
    recommend?: string;

    @Column({ type: 'boolean', default: false  })
    is_verify?: boolean;

    @Column({ type: 'boolean', default: false  })
    is_delete?: boolean;

    @Column({ type: 'boolean', default: false  })
    twoFactor?: boolean;

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

