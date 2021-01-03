'use strict'

import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"
import { User } from "../models/interfaces/user.ts";
import { auth } from "./authController.ts";
import { sqlConnection } from "../database/sqlConnection.ts";
import { getAll } from "../models/friendModel.ts";


export const friendsController  = (app: any, endpoint: string) => {

	app.get(endpoint + "/friends", getFriends, auth)	
	.post(endpoint +"/friends", getFriends, auth) 
	console.log("FriendsController enabled!");
}

const getFriends: HandlerFunc = async (context: any) => {
	try {
		const response: any = await getAll(context.user.token);
		successResponse(context, response);
	} catch(error: any) {
		errorResponse(context, error, 403);
	}
}

