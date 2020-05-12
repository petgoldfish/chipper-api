import {
	ResolverInterface,
	FieldResolver,
	Resolver,
	Root,
	Mutation,
	Arg,
	Query,
	Int,
	Ctx,
} from "type-graphql";
import { User } from "../entities/User";
import { Chirp } from "../entities/Chirp";
import { authAndGetUserId } from "../utils";
import { Context } from "../types/Context";

@Resolver((of) => User)
export class UserResolver implements ResolverInterface<User> {
	@FieldResolver()
	async chirps(@Root() author: User) {
		return Chirp.find({ where: { authorId: author.id }, cache: 1000 });
	}

	@Query((returns) => [User])
	async users(@Ctx() context: Context) {
		authAndGetUserId(context);
		return User.find({
			relations: ["chirps"],
		});
	}

	@Query((returns) => User)
	async me(@Ctx() context: Context) {
		const userId = authAndGetUserId(context);
		return User.findOne({
			where: {
				id: userId,
			},
			relations: ["chirps"],
		});
	}

	@Mutation(() => Boolean)
	async deleteUser(@Arg("id", () => Int) id: number) {
		return (await User.delete(id)).affected!;
	}
}
