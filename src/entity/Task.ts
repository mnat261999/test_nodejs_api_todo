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

    @Column()
    statusTask: string;

    @Column()
    userIdCreateTask: number;

    @ManyToOne(type => User, user => user.idUser)
    userIdAssingTask: User;
  
    @Column()
    @CreateDateColumn()
    createdAtTask: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAtTask: Date;
  }