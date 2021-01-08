'use strict'
import { select, insert, update, delet, joinSelect } from "../database/queries.ts";
import { sqlConnection } from "../database/sqlConnection.ts"
import { User } from "./interfaces/user.ts"

export const getMany: Function = async (user: User) => {
	return await joinSelect('friends', ['users.username'], {userId: user.id}, 'users',{'friends.friendId': 'users.id'})
}

export const getOne: Function = async (id: number, user: User) => {
	//return await select("friends", [], {userId: user.id, id: id}, undefined);
	return await joinSelect('friends', ['users.username'], {userId: user.id, 'friends.id': id}, 'users',{'friends.friendId': 'users.id'})
}

export const postOne: Function = async (id: any, user: User) => {
	let query: any = {
		friendId: id,
		userId: user.id
	}
	const inserted = await insert('friends', query);
	return await getOne(inserted.lastInsertId, user);
}
