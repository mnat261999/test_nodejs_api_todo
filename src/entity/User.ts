import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
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
  }