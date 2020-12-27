import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";
import { verifyToken } from "../helpers/jwt.ts";

export const auth: MiddlewareFunc = (next: any) => async (context: any) => {
	const authorization: any = context.request.headers.get('authorization');
	if (!authorization) {
		errorResponse(context, "Authorization needed!", 401);
		return;
	}
	const validToken = await verifyToken(authorization); 
	if(!validToken) {
		errorResponse(context, "Bearer token wrong!", 401);
		return;
	}

	await next(context);
}
