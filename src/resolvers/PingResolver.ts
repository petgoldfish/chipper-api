import { Resolver, Query } from "type-graphql";

@Resolver()
export class PingResolver {
	@Query(returns => String)
	ping() {
		return "pong";
	}
}
