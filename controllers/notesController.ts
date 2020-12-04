import { HandlerFunc  } from "https://deno.land/x/abc/types.ts";

export const notesController  = (app: any) => {

	app.get("/notes", (data: any) => {return data.json("get notes")})
	.get("/notes/:id", (data: any) => {return data.json("get note with id")})
	.post("/notes", (data: any) => {return data.json("post notes")})
	.put("/notes", (data: any) => {return data.json("put notes")});
}


