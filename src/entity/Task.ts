import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';

  import {User} from './User'
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn()
    idTask: number;

    @Column()
    nameTask: string;
  
    @Column()
    desTask: string;
  
    @Column()
    dateCompletedTask: Date;

    @Column({ default: "string"})
    statusTask: string;
  
    @Column()
    @CreateDateColumn()
    createdAtTask: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAtTask: Date;

    @ManyToOne(type => User, user => user.idUser)
    userIdCreateTask: User;

    @ManyToOne(type => User, user => user.idUser)
    userIdAssingTask: User;
  }