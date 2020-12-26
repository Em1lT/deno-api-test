//Class to handle mysql queries and return
import { sqlConnection } from "../database/sqlConnection.ts"
import { User } from "../models/interfaces/user.ts"
export const login: Function = async () => {
	const client  = sqlConnection;
	try {
		return await client.query('SELECT * FROM `demo-api`.user;');
	} catch (e: any) {
		return await e;
	}
}

export const register: Function = async (user: User) => {
	try {

		if(!user.firstname || user.firstname.length <= 2) {
			throw new Error("No firstname set!");
		}
		if(!user.lastname || user.lastname.length <= 2) {
			throw new Error("No lastname set!");
		}
		if(!user.password || user.password.length <= 2) {
			throw new Error("No password set!")
		}
		if(!user.username || user.username.length <= 2) {
			throw new Error("No username set!")
		}
		//crypt password
		const client  = sqlConnection;
		return await client.query('INSERT INTO `demo-api`.users (firstname, lastname, password, username) VALUES ("'+user.username+'", "'+user.lastname+'", "'+user.password+'", "'+user.username+'")');
	} catch (e: any) {
		throw new Error(e);
	}
}

export const getOne: Function = async (id: number) => {
	try {
		const client  = sqlConnection;	
		return await client.query('SELECT * FROM `demo-api`.users WHERE id = '+ id + ';');
	} catch (e: any) {
		return await e;
	}
}




