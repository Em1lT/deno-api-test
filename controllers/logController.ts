import { MiddlewareFunc } from "https://deno.land/x/abc/types.ts";

export const log: MiddlewareFunc = (next: any) => async (data:any) => {
	const id = createId();

	console.info('[ Request ] [ %s ] [ %s ] %s %s', id,  data.request.method, data.request.url, data.request.proto);
	await next(data);
}

const createId: Function = (): string => {
	return "" + Math.floor(Math.random()* 9999) + "-" + Math.floor(Math.random()* 9999) + "-" + Math.floor(Math.random()* 9999) + "-" + Math.floor(Math.random()* 9999);  
}
