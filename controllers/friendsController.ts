'use strict'

import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"
import { User } from "../models/interfaces/user.ts";
import { Friend } from "../models/interfaces/friend.ts";
import { auth } from "./authController.ts";
import { sqlConnection } from "../database/sqlConnection.ts";
import { getMany, postOne, getOne, getWithFriendId, deleteOne } from "../models/friendModel.ts";
import { getOne as getUser } from "../models/userModel.ts";
import { getAll as getNotes } from "../models/noteModel.ts";

export const friendsController  = (app: any, endpoint: string) => {

	app.get(endpoint + "/friends", getFriends, auth)	
		.get(endpoint + "/friends/:id", getFriend, auth)
		.post(endpoint +"/friends/add/:id", postFriends, auth) 
		.get(endpoint +"/friends/:id/notes", friendsPostedNotes, auth) 
		.delete(endpoint +"/friends/:id", removeFriend, auth) 
	console.log("FriendsController enabled!");
}

const getFriend: HandlerFunc = async (context: any) => {
	const id = await context.params.id;
	try {
		const response: any = await getOne(id, context.user.token);
		successResponse(context, response);
	} catch(error: any){ 
		return errorResponse(context, error, 403);
	}
}

const removeFriend: HandlerFunc = async (context: any) => {
	const id = await context.params.id;
	if(id == null || !context.user) {
		return errorResponse(context, 'No id!', 403);
	}
	const alreadyDeleted: Friend = await getWithFriendId(id, context.user.token);
	if(!alreadyDeleted) {
		return errorResponse(context, 'Deletion cannot be done!', 403);
	}
	try {
		const response: any = await deleteOne(alreadyDeleted.id, context.user.token);
		successResponse(context, response);
	} catch(error: any){ 
		return errorResponse(context, error, 403);
	}
}

const getFriends: HandlerFunc = async (context: any) => {
	try {
		const response: any = await getMany(context.user.token);
		successResponse(context, response);
	} catch(error: any){ 
		return errorResponse(context, error, 403);
	}
}

const friendsPostedNotes: HandlerFunc = async (context: any) => {
	const id = await context.params.id;
	if(id == null || !context.user) {
		return errorResponse(context, 'No id!', 403);
	}
	const user: User = await getUser(id, context.user.token);
	if(!user) {
		return errorResponse(context, 'No user id found!');
	}
	//TODO: add users notes
	const response: any = await getNotes(context.user.token, {userId: user.id});
	try {
		successResponse(context, response);
	} catch(error: any) {
		return errorResponse(context, error, 403);
	}
}

const postFriends: HandlerFunc = async (context: any) => {
	const id = await context.params.id;
	if(id == null || !context.user) {
		return errorResponse(context, 'No id!', 403);
	}
	const friend: User[] = await getUser(id, context.user.token);
	if(!friend || friend!.length == 0) {
		return errorResponse(context, 'No friend id found!');
	}
	const alreadyFriend: Friend[] = await getWithFriendId(id, context.user.token);
	if(alreadyFriend) {
		return errorResponse(context, 'Already a friend!', 403);
	}
	const response: any = await postOne(id, context.user.token);
	try {
		successResponse(context, response);
	} catch(error: any) {
		return errorResponse(context, error, 403);
	}
}

