import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"
import { User } from "../models/interfaces/user.ts"
import { register, login, getOne } from "../models/userModel.ts"

export const loginController  = (app: any) => {

	app.get("/login", loginUser)	
	.post("/register", registerUser)
	console.log("loginController enabled!");
}

const registerUser: HandlerFunc = async (context: any) => {
	const user: User = await <User> context.body;
	try {
		const response: any = await register(user);
		const createdUser: User = await getOne(response.lastInsertId); 
		successResponse(context, createdUser);
	} catch(err: any) {
		errorResponse(context, err, 403);	
	}
}


const loginUser: Function = async (context: any) => {
	errorResponse("err", context, 403);
}
