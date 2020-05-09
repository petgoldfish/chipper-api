import {
	Query,
	Mutation,
	Arg,
	ResolverInterface,
	FieldResolver,
	Root,
	Int,
	Resolver,
	Ctx,
} from "type-graphql";
import { Chirp } from "../entities/Chirp";
import { User } from "../entities/User";
import { authAndGetUserId } from "../utils";
import { Context } from "../types/Context";

@Resolver((of) => Chirp)
export class ChirpResolver implements ResolverInterface<Chirp> {
	@FieldResolver()
	async author(@Root() chirp: Chirp) {
		return (await User.findOne(chirp.authorId, { cache: 1000 }))!;
	}

	@Query((returns) => [Chirp], { nullable: true })
	async feed() {
		return await Chirp.find({
			relations: ["author"],
		});
	}

	@Mutation((returns) => Boolean)
	async addChirp(@Ctx() context: Context, @Arg("content") content: string) {
		const authorId = authAndGetUserId(context);
		await Chirp.create({ authorId, content }).save();
		return true;
	}

	@Mutation(() => Boolean)
	async deleteChirp(@Arg("id") id: number) {
		return (await Chirp.delete(id)).affected!;
	}
}
