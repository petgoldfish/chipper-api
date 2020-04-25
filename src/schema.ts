import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/PingResolver";
import { ChirpResolver } from "./resolvers/ChirpResolver";
import { UserResolver } from "./resolvers/UserResolver";

export function createSchema() {
	return buildSchema({
		resolvers: [PingResolver, ChirpResolver, UserResolver],
	});
}
