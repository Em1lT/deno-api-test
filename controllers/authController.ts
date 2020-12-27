import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";


export const auth: MiddlewareFunc = (next: any) => async (context: any) => {
	const authorization: any = context.request.headers.get('authorization');
	if (!authorization) {
		errorResponse(context, "Authorization needed!", 401);
		return;
	}	
	await next(context);
}
