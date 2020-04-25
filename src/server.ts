import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { Context } from "./types/Context";
import { createSchema } from "./schema";

// Development mode
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

(async function main() {
	// Setup database connection
	await createConnection({
		type: "postgres",
		entities: ["src/entities/**/*.ts"],
		synchronize: true,
		url: process.env.DATABASE_URL,
		cache: true,
	});

	// Get type-graphql schema
	const schema = await createSchema();

	// Setup graphql server
	const server = new ApolloServer({
		schema,
		context: ({ request }: Context) => ({ request }),
	});

	// Start server
	server.listen(process.env.PORT || 4000, () =>
		console.log("server running on http://localhost:4000/graphql")
	);
})();
