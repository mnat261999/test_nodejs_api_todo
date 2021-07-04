import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    OneToMany

  } from 'typeorm';

  import {Task} from './Task'
  
  @Entity()
  @Unique(['email'])
  export class User {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column({ default: 0})
    role: number;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Task, task => task.idTask) // note: we will create author property in the Photo class below
    photos: Task[];
  }