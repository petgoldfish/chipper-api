import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";

@Resolver()
export class AuthResolver {
	@Mutation((returns) => Boolean)
	async signup(@Arg("name") name: string, @Arg("password") password: string) {
		const hashedPassword = hashSync(password, 10);
		await User.create({ name, password: hashedPassword }).save();
		return true;
	}

	@Mutation((returns) => String)
	async login(
		@Arg("name") name: string,
		@Arg("password") password: string
	): Promise<String> {
		const user = await User.findOne({ name });
		if (!user) {
			throw new Error("User does not exist.");
		}

		const valid = compareSync(password, user.password);
		if (!valid) {
			throw new Error("Invalid password.");
		}

		const token = sign({ userId: user.id }, process.env.APP_SECRET!);

		return token;
	}
}
