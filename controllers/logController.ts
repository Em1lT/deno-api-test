import { MiddlewareFunc, HandlerFunc } from "https://deno.land/x/abc/types.ts";

export const log: MiddlewareFunc = (next) => (data)=> {
	console.info('[ Request ] [ %s ] %s %s', data.request.method, data.request.url, data.request.proto);
	next(data);
}


