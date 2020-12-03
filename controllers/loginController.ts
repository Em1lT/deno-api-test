import { sqlConnection } from "../database/sqlConnection.ts"


export const loginController  = (app: any) => {
	app.get("/login", login, test)
	.post("/register", register)
}
const test = (next:any) => () => {
	console.log("here in mw");
	next();
}

const register = async () => {
	const client  = sqlConnection;
	return await client.query('SELECT * FROM `demo-api`.users;');
}


const login = () => {
	return "Login function"
}
