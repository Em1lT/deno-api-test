//Class to handle mysql queries and return
import { sqlConnection } from "../database/sqlConnection.ts"
import { select, insert, update, delet } from "../database/queries.ts"
import { Note } from "./interfaces/note.ts"
import { User } from "./interfaces/user.ts"

export const getAll: Function = async (user: User) => {
	return await select("notes", [], {"userId": user.id}, undefined);
}

export const getOne: Function = async (id: number, user: User) => {
	return await select("notes", [], {"userId": user.id, "id": id}, undefined);
}

export const postOne: Function = async (note: Note, user: User) => {
	const queue: any = await insert("notes", {message: note.message, title: note.title, userId: user.id });
	return await getOne(queue.lastInsertId!, user);
}

export const putOne: Function = async (message: String, id: number, user: User) => {
	const queue = await update('notes', {message: message}, {id:id, userId: user.id})
	return await getOne(id);
}

export const deleteOne: Function = async (id: number) => {
	const client  = sqlConnection;
	await delet("notes", {id:id});
	return await {status:"success", id: id};
}
