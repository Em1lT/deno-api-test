import { MiddlewareFunc, HandlerFunc } from "https://deno.land/x/abc/types.ts";

export const log: MiddlewareFunc = (next: any) => async (data:any) => {
	console.info('[ Request ] [ %s ] %s %s', data.request.method, data.request.url, data.request.proto);
	await next(data);
}

