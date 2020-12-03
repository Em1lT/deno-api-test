import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";

export const AuthenticationController: MiddlewareFunc = (next) => (request)=> {
	const url: string = request.url.pathname;


	next(data);
}
