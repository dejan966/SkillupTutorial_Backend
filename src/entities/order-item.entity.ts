import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Base } from './base.entity'
import { Order } from './order.entity'

@Entity()
export class OrderItem extends Base {
  @Column()
  @Exclude()
  product_title: string

  @Column()
  @Exclude()
  price: number

  @Column()
  quantity: number

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order[]
}
