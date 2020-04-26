import {
	Query,
	Mutation,
	Arg,
	ResolverInterface,
	FieldResolver,
	Root,
	Int,
	Resolver,
} from "type-graphql";
import { Chirp } from "../entities/Chirp";
import { User } from "../entities/User";

@Resolver((of) => Chirp)
export class ChirpResolver implements ResolverInterface<Chirp> {
	@FieldResolver()
	async author(@Root() chirp: Chirp) {
		return (await User.findOne(chirp.authorId, {cache: 1000}))!;
	}

	@Query((returns) => [Chirp], { nullable: true })
	async feed() {
		return await Chirp.find({
			relations: ["author"],
		});
	}

	@Mutation((returns) => Chirp)
	async addChirp(
		@Arg("authorId", () => Int) authorId: number,
		@Arg("content") content: string
	) {
		return Chirp.create({ authorId, content }).save();
	}

	@Mutation(() => Boolean)
	async deleteChirp(@Arg("id") id: number) {
		return (await Chirp.delete(id)).affected!;
	}
}
