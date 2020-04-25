import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/PingResolver";

export function createSchema() {
	return buildSchema({
		resolvers: [PingResolver],
	});
}
