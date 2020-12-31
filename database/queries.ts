'use strict'

import { sqlConnection } from "../database/sqlConnection.ts"
const client  = sqlConnection;


export const select = async (table: string, columns: string[], where: any, limit?: number) => {	
	
	let query: string = 'SELECT'

	if(columns.length > 0) {
		for(let item of columns) {
			query += ", " + item;
		}
	} else {
		query += ' * '
	}

	query += ' FROM `demo-api`.' + table;

	const fields: string[] = [];
	if (where && Object.keys(where).length !== 0) {
	        let values: string = "";
		for (let key in where) {
                	values += (key + ' = ? AND ');
			fields.push(where[key]);
		 }
        	query += ' WHERE ' + values.toString().slice(0, -5);
        }

	if(limit) {
		query += " LIMIT " + limit
	}
	query += ';'
	
	try {
		return await client.query(query, fields);
	} catch(error: any) {
		throw new Error(error);
	}

	
}

export const insert = async (table: string, updatedValues: any) => {	
//const queue = await client.execute('INSERT INTO `demo-api`.notes (message, title, userId) VALUES (?,?,?);', [note.message, note.title, user.id ]);	

	let query: string = 'INSERT INTO'
	query += ' `demo-api`.' + table;
	const fields: string[] = [];
	if (updatedValues && Object.keys(updatedValues).length !== 0) {
	        let values: string = " (";
		let questionMarks: string = "(";
		for (let key in updatedValues) {
                	values += "" + key + ", ";
			questionMarks += "?,";
			fields.push(updatedValues[key]);
		 }
        	query += values.toString().slice(0, -2) + ")";
        	query += ' VALUES '
		query += questionMarks.toString().slice(0,-1) + ")";
	}
	query += ';'
	return await client.query(query, fields);
}


