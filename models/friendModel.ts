'use strict'
import { select, insert, update, delet, joinSelect } from "../database/queries.ts";
import { sqlConnection } from "../database/sqlConnection.ts"
import { User } from "./interfaces/user.ts"

export const getMany: Function = async (user: User): Promise<any> => {
	return await joinSelect('friends', ['users.username'], {userId: user.id}, 'users',{'friends.friendId': 'users.id'})
}

export const getOne: Function = async (id: number, user: User): Promise<any> => {
	//return await select("friends", [], {userId: user.id, id: id}, undefined);
	return await joinSelect('friends', ['users.username'], {userId: user.id, 'friends.id': id}, 'users',{'friends.friendId': 'users.id'})
}

export const deleteOne: Function = async (id: number, user: User): Promise<any> => {
	//return await select("friends", [], {userId: user.id, id: id}, undefined);
	const response: any = await delet('friends', { id: id });
	return await {status:"success", id: id};
}

export const getWithFriendId: Function = async (id: number, user: User): Promise<any> => {
	const response: any = await select('friends',{friendId: id, userId: user.id});
	return response.length > 0 ? response[0] : undefined;
}

export const postOne: Function = async (id: any, user: User) => {
	let query: any = {
		friendId: id,
		userId: user.id
	}
	const inserted = await insert('friends', query);
	return await getOne(inserted.lastInsertId, user);
}
