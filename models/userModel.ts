//Class to handle mysql queries and return
import { sqlConnection } from "../database/sqlConnection.ts"

export const login: Function = async () => {
	const client  = sqlConnection;
	try {
		return await client.query('SELECT * FROM `demo-api`.user;');
	} catch (e: any) {
		return await e;
	}
}


