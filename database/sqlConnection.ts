import { Client } from "https://deno.land/x/mysql/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

export const sqlConnection = await new Client().connect({
	  hostname: Deno.env.get("HOST"),
	  username: Deno.env.get("DBUSER"),
	  db: Deno.env.get("DB"),
	  password: Deno.env.get("PASS")
});

