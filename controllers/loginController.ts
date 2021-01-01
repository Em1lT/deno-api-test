import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"
import { User } from "../models/interfaces/user.ts"
import { register, getOne, getByName } from "../models/userModel.ts"
import { createJwtToken } from '../helpers/jwt.ts'
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export const loginController  = (app: any) => {

	app.post("/login", loginUser)	
	.post("/register", registerUser)
	console.log("loginController enabled!");
}

const registerUser: HandlerFunc = async (context: any) => {
	const user: User = await <User> context.body;
	try {
		const response: any = await register(user);
		const createdUser: User = await getOne(response.lastInsertId);
		delete createdUser.password;
		successResponse(context, createdUser);
	} catch(err: any) {
		return await errorResponse(context, err, 403);	
	}
}


const loginUser: Function = async (context: any) => {
	const user: User = await <User> context.body;
	try {
		const dbUser: User = await getByName(user.username);
		if(!dbUser) {
			return await errorResponse(context, "No username!", 400);
		}
		const comparedHash = await bcrypt.compare(user.password!, dbUser.password!);	
		if(!comparedHash) {
			return await errorResponse(context, "Wrong password!", 400);
		}
		delete dbUser.password;
		dbUser.token = await createJwtToken(dbUser);
		successResponse(context, dbUser);
	} catch(err: any) {
		return await errorResponse(context, err, 403);	
	}
}
