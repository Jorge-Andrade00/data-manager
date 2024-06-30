import { Users } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Address {
  @Column({ type: 'int', primary: true, generated: true })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  street: string;

  @Column({ type: 'varchar', nullable: false, length: 5 })
  number: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  city: string;

  @ManyToOne(() => Users, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ type: 'int', nullable: false })
  userId: number;
}
