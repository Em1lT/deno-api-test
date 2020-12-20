import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"

export const loginController  = (app: any) => {

	app.get("/login", login)	
	.post("/register", register)
	console.log("loginController enabled!");
}

const register: HandlerFunc = async (context: any) => {
	context.json("test", 200);
}


const login: Function = async (context: any) => {
	errorResponse("err", context, 403);
}
