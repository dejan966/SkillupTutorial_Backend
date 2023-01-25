import { Column, Entity, JoinColumn, JoinTable, ManyToMany } from 'typeorm'
import { Base } from './base.entity'
import { Permission } from './permission.entity'

@Entity()
export class Role extends Base {
  @Column()
  name: string

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'role permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[]
}
