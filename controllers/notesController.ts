import { HandlerFunc } from "https://deno.land/x/abc/types.ts";
import { Context } from "https://deno.land/x/abc/mod.ts";
import { getAll as NotesGetAll, getOne, postOne } from "../models/noteModel.ts"
import { Note } from "../models/interfaces/note.ts"
import { successResponse, errorResponse } from "../handlers/responseHandler.ts"

export const notesController  = (app: any) => {

	app.get("/notes", getAllNotes)
	.get("/notes/:id", getOneNote)
	.post("/notes", postNote)
	.put("/notes", (data: any) => {return data.json("put notes")});

	console.log("notesController enabled!");
}

//TODO: Handle params
const getAllNotes: HandlerFunc = async (context: Context) => {	
	try {
		const allNotes = await NotesGetAll() 
		successResponse(context, allNotes);
	} catch (e) {
		errorResponse(context, e, 403);
	}
	
}

const getOneNote: HandlerFunc = async (context: Context) => {
	const { id } = await context.params as any;
	try {
		const noteWithId = await getOne(id);
		successResponse(context, noteWithId);
	} catch(error: any) {
		errorResponse(context, error, 403);
	}
}


//TODO: Validate context body
const postNote: HandlerFunc = async (context: Context) => {
	const { message } = await context.body as Note
	if(message === undefined) {
		errorResponse(context, "No message!", 403);
		return;
	}

	try {
		successResponse(context, await postOne(message));
	} catch (error: any) {
		errorResponse(context, error, 403);
	}
}
	


