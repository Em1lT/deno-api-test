import { HandlerFunc } from "https://deno.land/x/abc/types.ts";
import { Context } from "https://deno.land/x/abc/mod.ts";
import { getAll as NotesGetAll, getOne, postOne, putOne, deleteOne } from "../models/noteModel.ts"
import { Note } from "../models/interfaces/note.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";
import { auth } from "./authController.ts";

export const notesController  = (app: any) => {

	app.get("/notes",  getAllNotes, auth)
	.get("/notes/:id", getOneNote)
	.post("/notes", postNote)
	.put("/notes/:id", updateNote)
	.delete("/notes/:id", deleteNote);

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
	if (message === undefined) {
		errorResponse(context, "No message!", 403);
		return;
	}
	try {
		successResponse(context, await postOne(message));
	} catch (error: any) {
		errorResponse(context, error, 403);
	}
}
	
const updateNote: HandlerFunc = async (context: Context) => {
	const { message } = await context.body as Note
	const { id } = await context.params as any;
	if (message === undefined) {
		errorResponse(context, "No message or id!", 403);
		return;
	}
	try {
		successResponse(context, await putOne(message, id));
	} catch(error: any) {
		errorResponse(context, error, 403);
	}
}

const deleteNote: HandlerFunc = async (context: Context) => {
	const { id } = await context.params as any;
	console.log(id);
	if (!id) {
		errorResponse(context, "No id!", 403);
		return;
	}
	try {
		successResponse(context, await deleteOne(id));
	} catch(error: any) {
		errorResponse(context, error, 403);
	}
}


