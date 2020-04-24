import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { getDBConnection } from "./context";

// Development mode
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const typeDefs = `
type Query {
	info: String!
}
`;

const resolvers = {
	Query: {
		info: () => `This is the chipper API`,
	},
};

(async function main() {
	const db = await getDBConnection();
	const server = new GraphQLServer({
		typeDefs,
		resolvers,
		context: ({ req, res }: any) => ({ req, res, db }),
	});

	server.start(() => console.log("server running on http://localhost:4000"));
})();
