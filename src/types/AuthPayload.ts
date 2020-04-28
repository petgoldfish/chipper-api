import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthPayload {
	@Field()
	token!: string;

	@Field()
	userId!: number;
}
