//Class to handle mysql queries and return
import { sqlConnection } from "../database/sqlConnection.ts"
import { Note } from "./interfaces/note.ts"
import { User } from "./interfaces/user.ts"

export const getAll: Function = async (user: User) => {
	const client  = sqlConnection;
	try {
		return await client.query('SELECT * FROM `demo-api`.notes WHERE userId = ?;' ,[user.id]);
	} catch (e: any) {
		return await e;
	}
}

export const getOne: Function = async (id: number, user: User) => {
	try {
		const client  = sqlConnection;	
		return await client.query('SELECT * FROM `demo-api`.notes WHERE id = ? AND userId = ?;', [id, user.id]);
	} catch (e: any) {
		console.log(e);
		return await e;
	}
}

export const postOne: Function = async (message: String) => {
	const client  = sqlConnection;
	try {
		const queue = await client.execute('INSERT INTO `demo-api`.notes (`message`) VALUES ("'+message+'");');	
		return await getOne(queue.lastInsertId!);
	} catch (e: any) {
		console.log(e);
		return await e;
	}
}

export const putOne: Function = async (message: String, id: number) => {
	const client  = sqlConnection;
	try {
		const queue = await client.execute('UPDATE `demo-api`.notes SET `message` =("'+message+'") WHERE (id = '+id+');');	
		return await getOne(id);
	} catch (e: any) {
		return await e;
	}
}

export const deleteOne: Function = async (id: number) => {
	const client  = sqlConnection;
	try {
		const queue = await client.execute('DELETE FROM `demo-api`.notes WHERE (id = '+id+'');
		return await {status:"success", id: id};
	} catch (e: any) {
		throw new Error(e);
	}
}
