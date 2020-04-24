import { Request, Response } from "express";
import { createConnection, Connection } from "typeorm";

export interface Context {
	request: Request;
	response: Response;
	db: Connection;
}

export async function getDBConnection() {
	const db = await createConnection({
		type: "postgres",
		entities: ["src/entities/**/*.ts"],
		synchronize: true,
		url: process.env.DATABASE_URL,
	});

	return db;
}
