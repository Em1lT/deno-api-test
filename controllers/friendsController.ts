'use strict'

import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"
import { User } from "../models/interfaces/user.ts";
import { Friend } from "../models/interfaces/friend.ts";
import { auth } from "./authController.ts";
import { sqlConnection } from "../database/sqlConnection.ts";
import { getMany, postOne, getOne } from "../models/friendModel.ts";


export const friendsController  = (app: any, endpoint: string) => {

	app.get(endpoint + "/friends", getFriends, auth)	
		.get(endpoint + "/friends/:id", getFriend, auth)
		.post(endpoint +"/friend/add/:id", postFriends, auth) 
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

const postFriends: HandlerFunc = async (context: any) => {

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

