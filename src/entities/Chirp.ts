import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from "typeorm";
import { ID, Field, ObjectType, GraphQLTimestamp } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Chirp extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => GraphQLTimestamp)
	@CreateDateColumn()
	createdAt!: Date;

	@Field()
	@Column()
	content!: string;

	@Field(() => User)
	@ManyToOne((type) => User, (user) => user.chirps, { onDelete: "CASCADE" })
	author!: User;

	@Column({ nullable: false })
	authorId!: number;
}
