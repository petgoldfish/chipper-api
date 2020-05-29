import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
} from "typeorm";
import { Chirp } from "./Chirp";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({
		unique: true,
	})
	name!: string;

	@Column()
	password!: string;

	@Field(() => [Chirp], { nullable: true })
	@OneToMany((type) => Chirp, (chirp) => chirp.author)
	chirps?: Array<Chirp>;
}
