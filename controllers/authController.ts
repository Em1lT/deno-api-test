import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";

export const auth: MiddlewareFunc = (next: any) => async (context: any) => {

	if (!context.request.headers.authorization) {
		errorResponse(context, "no Auth", 500);
		return;
	}
	await next(context);
}
