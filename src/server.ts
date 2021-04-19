import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { createSchema } from "./schema";

// Development mode
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

(async function main() {
	// Setup database connection
	await createConnection({
		type: "postgres",
		entities: [__dirname + "/entities/*"],
		synchronize: true,
		url: process.env.DATABASE_URL,
		cache: true,
		ssl: true
	});

	// Get type-graphql schema
	const schema = await createSchema();

	// Setup graphql server
	const server = new ApolloServer({
		cors: {
			origin: process.env.CORS_ORIGIN,
			credentials: true
		},
		schema,
		context: ({ req }) => ({ request: req }),
	});

	// Start server
	server.listen(process.env.PORT || 4000, () =>
		console.log("server up and running")
	);
})();
