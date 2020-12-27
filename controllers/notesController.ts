import { HandlerFunc } from "https://deno.land/x/abc/types.ts";
import { Context } from "https://deno.land/x/abc/mod.ts";
import { getAll as NotesGetAll, getOne, postOne, putOne, deleteOne } from "../models/noteModel.ts"
import { Note } from "../models/interfaces/note.ts";
import { successResponse, errorResponse } from "../handlers/responseHandler.ts";
import { auth } from "./authController.ts";
import { verifyToken } from "../helpers/jwt.ts";

export const notesController  = (app: any) => {

	app.get("/notes",  getAllNotes, auth)
	.get("/notes/:id", getOneNote, auth)
	.post("/notes", postNote, auth)
	.put("/notes/:id", updateNote, auth)
	.delete("/notes/:id", deleteNote, auth);

	console.log("notesController enabled!");
}

//TODO: Handle params
const getAllNotes: HandlerFunc = async (context: Context) => {	
	try {

		const user: any = await checkToken(context.request.headers.get('authorization'));
		const allNotes = await NotesGetAll(user); 
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

const checkToken: Function = async (auth: string) => {
	const token: string = auth.replace(/^Bearer\s+/, "");
	const validToken: any = await verifyToken(token); 
	if(!validToken) {
		throw new Error("Bearer token is not valid!");
	}
	return validToken;
}

