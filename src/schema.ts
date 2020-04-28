import { buildSchema } from "type-graphql";
import { join } from "path";

export function createSchema() {
	return buildSchema({
		resolvers: [join(__dirname, "/resolvers/*")],
	});
}
