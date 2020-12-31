import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";
import { verifyToken, decodeJwtToken } from "../helpers/jwt.ts";
import { ContextWithId } from "../models/interfaces/context.ts";

export const auth: MiddlewareFunc = (next: any) => async (context: any) => {
	const authorization: any = context.request.headers.get('authorization');
	if (!authorization) {
		return errorResponse(context, "Authorization needed!", 401);
	}
	
	const token: string = authorization.replace(/^Bearer\s+/, "");
	const validToken: any = await decodeJwtToken(token); 
	if(!validToken) {
		return errorResponse(context, "Bearer token is not valid!", 401);
	}
	context.user = validToken;
	await next(context);
}
