import {
	ResolverInterface,
	FieldResolver,
	Resolver,
	Root,
	Mutation,
	Arg,
} from "type-graphql";
import { User } from "../entities/User";
import { Chirp } from "../entities/Chirp";

@Resolver((of) => User)
export class UserResolver implements ResolverInterface<User> {
	@FieldResolver()
	async chirps(@Root() author: User) {
		return await Chirp.find({
			relations: ["chirps"],
		});
	}

	@Mutation((returns) => User)
	async createUser(
		@Arg("name") name: string,
		@Arg("password") password: string
	) {
		return User.create({ name, password }).save();
	}
}
