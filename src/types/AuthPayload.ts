import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthPayload {
	@Field({nullable: true})
	token?: string;
}
