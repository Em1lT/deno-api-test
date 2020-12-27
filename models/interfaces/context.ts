import { Context } from "https://deno.land/x/abc/mod.ts";
import { User } from "./user.ts";

export interface ContextWithId {
	user: User;
}
