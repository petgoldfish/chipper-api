import {
	ResolverInterface,
	FieldResolver,
	Resolver,
	Root,
	Mutation,
	Arg,
	Query,
	Int,
} from "type-graphql";
import { User } from "../entities/User";
import { Chirp } from "../entities/Chirp";

@Resolver((of) => User)
export class UserResolver implements ResolverInterface<User> {
	@FieldResolver()
	async chirps(@Root() author: User) {
		return Chirp.find({ where: { authorId: author.id }, cache: 1000 });
	}

	@Query((returns) => [User])
	async users() {
		return User.find({ 
			relations: ["chirps"],
		});
	}

	@Mutation(() => Boolean)
	async deleteUser(@Arg("id", () => Int) id: number) {
		return (await User.delete(id)).affected!;
	}
}
