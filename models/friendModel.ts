'use strict'
import { select, insert, update, delet, joinSelect } from "../database/queries.ts";
import { sqlConnection } from "../database/sqlConnection.ts"
import { User } from "./interfaces/user.ts"

export const getAll: Function = async (user: User) => {
	return await joinSelect('friends', ['users.username'], {userId: user.id}, 'users',{'friends.friendId': 'users.id'})
}
