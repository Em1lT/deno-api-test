import { create, verify } from "https://deno.land/x/djwt@v2.0/mod.ts"
import "https://deno.land/x/dotenv/load.ts";
import { User } from "../models/interfaces/user.ts"

const secret: string | undefined = Deno.env.get("secret");
const type: string | undefined = Deno.env.get("type");

export const createJwtToken: Function = async (user: User) => {
	return await create({ alg: "HS256", typ: type! }, { token: user }, secret!);
}

export const verifyToken: Function = async (token: string) => {
	try {
		const validToken: any = await verify(token, secret!, "HS256");
	} catch(error: any) {
		return false;
	}
	return true; 
}
