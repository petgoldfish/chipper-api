import { Context } from "./types/Context";
import { verify } from "jsonwebtoken";

export function authAndGetUserId(context: Context): number {
	const authorizationHeader = context.request.get("Authorization");
	if (authorizationHeader) {
		const token = authorizationHeader.replace("Bearer ", "");
		const { userId }: any = verify(token, process.env.APP_SECRET!);
		return userId;
	}

	throw new Error("Not authenticated");
}
