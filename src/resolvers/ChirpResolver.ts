import { Query } from "type-graphql";
import { Chirp } from "../entities/Chirp";

export class ChirpResolver {
	@Query((returns) => [Chirp], { nullable: true })
	async feed() {
		return await Chirp.find();
	}
}
