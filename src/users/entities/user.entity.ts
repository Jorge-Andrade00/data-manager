import { Column, Entity } from 'typeorm';

@Entity()
export class Users {
  @Column({ type: 'int', primary: true, generated: true })
  private id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 9 })
  private rut: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  private name: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  private firstSurname: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  private secondSurname: string;
}
