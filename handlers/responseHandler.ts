


export const successResponse: Function  = async(context: any,response: any) => {
	context.json(response, 200);
}

export const errorResponse: Function = async (context: any, error: any, statusCode: number) => {
	console.log("error");
	console.log(error);
	console.log("error");
	context.json(error, statusCode);
}
