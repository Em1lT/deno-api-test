import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";



export const loginController  = (app: any) => {

	app.get("/login", login)	
	.post("/register", register)
}

const register: HandlerFunc = async (context: any) => {
	context.json("test", 200);
}


const login = async (context: any) => {
	return context.json("Login function");
}
