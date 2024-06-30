import { Address } from '../../addresses/entities/address.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @Column({ type: 'int', primary: true, generated: true })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 9 })
  rut: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  firstSurname: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  secondSurname: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
