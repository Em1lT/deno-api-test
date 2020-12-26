import { create } from "https://deno.land/x/djwt@$VERSION/mod.ts"


export const createJwtToken: Function = async (token: string) => {
	return await create({ alg: "HS512", typ: "JWT" }, { foo: token }, "secret");
	
}
