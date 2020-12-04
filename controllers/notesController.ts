import { HandlerFunc } from "https://deno.land/x/abc/types.ts";
import { Context } from "https://deno.land/x/abc/mod.ts";
import { getAll as NotesGetAll, getOne, postOne } from "../models/noteModel.ts"
import { Note } from "../models/interfaces/note.ts"


export const notesController  = (app: any) => {

	app.get("/notes", getAllNotes)
	.get("/notes/:id", getOneNote)
	.post("/notes", postNote)
	.put("/notes", (data: any) => {return data.json("put notes")});
}

//TODO: Handle params
const getAllNotes: HandlerFunc = async (context: Context) => {	
	context.json(await NotesGetAll());
}

const getOneNote: HandlerFunc = async (context: Context) => {
	const { id } = await context.params as any;
	context.json(await getOne(id));
}

//TODO: Validate context body
const postNote: HandlerFunc = async (context: Context) => {
	const { message } = await context.body as Note
	context.json(await postOne(message));
}


