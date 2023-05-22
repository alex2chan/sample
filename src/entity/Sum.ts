import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Sum {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstNumber: number

  @Column()
  secondNumber: number

  @Column()
  total: number
}
