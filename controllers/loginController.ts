import { sqlConnection } from "../database/sqlConnection.ts"
import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";



export const loginController  = (app: any) => {

	app.get("/login", login, test)
	.post("/register", register)
	.get("/test", (data: any) => {return data.json("paska")}, test)
}
const test = (next:any) => (data: any) => {
	next(data);
}

const register: HandlerFunc = async (context: any) => {
	const client  = sqlConnection;
	try {
		let query = await client.query('SELECT * FROM `demo-api`.users;');
		return context.json(query, 201);
	} catch (e: any) {
		return context.json("fail", 500);
	}
}


const login = async (context: any) => {
	return context.json("Login function");
}
