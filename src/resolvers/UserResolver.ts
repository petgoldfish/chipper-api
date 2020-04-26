import {
	ResolverInterface,
	FieldResolver,
	Resolver,
	Root,
	Mutation,
	Arg,
	Query,
} from "type-graphql";
import { User } from "../entities/User";
import { Chirp } from "../entities/Chirp";

@Resolver((of) => User)
export class UserResolver implements ResolverInterface<User> {
	@FieldResolver()
	async chirps(@Root() author: User) {
		return Chirp.find({ where: { authorId: author.id }, cache: 1000 });
	}

	@Mutation((returns) => User)
	async createUser(
		@Arg("name") name: string,
		@Arg("password") password: string
	) {
		return User.create({ name, password }).save();
	}

	@Query((returns) => [User])
	async users() {
		return User.find({ 
			relations: ["chirps"],
		});
	}
}
