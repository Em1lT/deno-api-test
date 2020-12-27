import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";
import { verifyToken, decodeJwtToken } from "../helpers/jwt.ts";
import { ContextWithId } from "../models/interfaces/context.ts";

export const auth: MiddlewareFunc = (next: any) => async (context: any) => {
	const authorization: any = context.request.headers.get('authorization');
	if (!authorization) {
		errorResponse(context, "Authorization needed!", 401);
		return;
	}
	
	const token: string = authorization.replace(/^Bearer\s+/, "");
	const validToken: any = await decodeJwtToken(token); 
	if(!validToken) {
		throw new Error("Bearer token is not valid!");
	}
	context.user = validToken;
	await next(context);
}
