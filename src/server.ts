import { GraphQLServer } from "graphql-yoga";

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

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log("server started");
});
