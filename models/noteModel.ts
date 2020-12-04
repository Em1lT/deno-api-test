//Class to handle mysql queries and return
import { sqlConnection } from "../database/sqlConnection.ts"
import { Note } from "./interfaces/note.ts"



//SAFER QUERIES!!!!!!!
export const getAll  = async () => {
	const client  = sqlConnection;
	try {
		return await client.query('SELECT * FROM `demo-api`.notes;');
	} catch (e: any) {
		return e;
	}
}

export const getOne = async (id: number) => {
	const client  = sqlConnection;
	try {
		return await client.query('SELECT * FROM `demo-api`.notes WHERE id = '+ id + ';');
	} catch (e: any) {
		return e;
	}
}

export const postOne = async (message: String) => {
	const client  = sqlConnection;
	try {
		const que = await client.execute('INSERT INTO `demo-api`.notes (`message`) VALUES ("'+message+'");');	
		return await getOne(que.lastInsertId!);
	} catch (e: any) {
		console.log(e);
		return e;
	}
}


//TODO: PUT
