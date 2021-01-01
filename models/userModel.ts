'use strict'

//Class to handle mysql queries and return
import { sqlConnection } from "../database/sqlConnection.ts"
import { User } from "../models/interfaces/user.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { select, insert, delet } from "../database/queries.ts"
const saltRounds: number = 8;

export const register: Function = async (user: User) => {
	checkUser(user);
	const salt = await bcrypt.genSalt(8);
	user.password = await bcrypt.hash(user.password!, salt)	
	return await insert("users", {firstname: user.firstname, lastname: user.lastname, password: user.password, username:  user.username });
}

export const deleteOne: Function = async (id: number) => {
	const client  = sqlConnection;
	await delet('users', { id: id })
	return await {status:"success", id: id};
}

export const getOne: Function = async (id: number) => {
	return await select("users", [], {id: id}, undefined);
}

export const getByName: Function = async (name: string) => {
	const client  = sqlConnection;	
	const response: User[] = await select( 'users', [], { username: name }, 1 );
	return response[0];
}


const checkUser = (user: User): User => {
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
		return user;
}


