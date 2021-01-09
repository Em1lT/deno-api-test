'use strict'

import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"
import { User } from "../models/interfaces/user.ts";
import { Friend } from "../models/interfaces/friend.ts";
import { auth } from "./authController.ts";
import { sqlConnection } from "../database/sqlConnection.ts";
import { getMany, postOne, getOne, getWithFriendId } from "../models/friendModel.ts";
import { getOne as getUser } from "../models/userModel.ts";

export const friendsController  = (app: any, endpoint: string) => {

	app.get(endpoint + "/friends", getFriends, auth)	
		.get(endpoint + "/friends/:id", getFriend, auth)
		.post(endpoint +"/friend/add/:id", postFriends, auth) 
		.post(endpoint +"/friend/:id/post", friendsPostedNotes, auth) 
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
	const response: any = await postOne(id, context.user.token);
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
	if(!alreadyFriend || alreadyFriend!.length > 0) {
		return errorResponse(context, 'Already a friend!', 403);
	}
	const response: any = await postOne(id, context.user.token);
	try {
		successResponse(context, response);
	} catch(error: any) {
		return errorResponse(context, error, 403);
	}
}

