import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn , ManyToOne, JoinColumn   } from "typeorm";

import EmployeeMigration from "./Employee.Migration";

@Entity('history_email_forgot_password')
export default class HistoryEmailForgotPasswordMigration  {
    @PrimaryColumn({ length:15})
    _hfid: string;
    
    @ManyToOne(() => EmployeeMigration , employee => employee._eid) @JoinColumn({ name: "_eid" , referencedColumnName: "_eid" })
    _eid: EmployeeMigration | null;

    @Column({ length:'255',nullable: true})
    email: string;

    @Column({ type:'text',nullable: true})
    subject: string;

    @Column({ type:'text',nullable: true})
    access_token: string;

    @Column({ type:'text',nullable: true})
    url_token: string;

    @Column({ type: 'boolean', default: false  })
    is_verify: boolean;

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

