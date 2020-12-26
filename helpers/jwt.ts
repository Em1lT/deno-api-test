import { create } from "https://deno.land/x/djwt@v2.0/mod.ts"


export const createJwtToken: Function = async (token: string) => {
	return await create({ alg: "HS512", typ: "JWT" }, { token: token }, "secret");

}
