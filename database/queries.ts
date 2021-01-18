'use strict'

import { sqlConnection } from "../database/sqlConnection.ts"
const client  = sqlConnection;

export const joinSelect: Function  = async (table: string, columns: string[], where: any, joinTable: string, on: any, limit?: number) => {	
	let query: string = 'SELECT'
	if(columns.length > 0) {
		let columnValues = '';
		for(let item of columns) {
			columnValues += ' '+ item + ',' ;
		}
		query += columnValues.toString().slice(0,-1);
	} else {
		query += ' * '
	}
	query += ' FROM `demo-api`.' + table;
	const fields: string[] = [];
	
	if(joinTable && on && Object.keys(on).length !== 0) {
		query += ' JOIN ' + joinTable + ' ON ';
		let values = "";
		for (let key in on) {
			values += key + ' = ' + on[key]	
		}
        	query += values.toString();
	}

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
	log(query, fields);
	return await client.query(query, fields);
}

export const select: Function  = async (table: string, columns: string[], where: any, or?: string, limit?: number) => {	
	let query: string = 'SELECT'
	const or: string = or ? 'OR': 'AND'; 
	if(columns.length > 0) {
		let columnValues = '';
		for(let item of columns) {
			columnValues += ' '+ item + ',' ;
		}
		query += columnValues.toString().slice(0,-1);
	} else {
		query += ' * '
	}
	query += ' FROM `demo-api`.' + table;
	const fields: string[] = [];
	if (where && Object.keys(where).length !== 0) {
	        let values: string = "";
		for (let key in where) {
                	values += (key + ' = ? ' + or + ' ');
			fields.push(where[key]);
		 }
        	query += ' WHERE ' + values.toString().slice(0, -5);
        }

	if(limit) {
		query += " LIMIT " + limit
	}
	query += ';'
	log(query, fields);
	return await client.query(query, fields);
}

export const insert: Function  = async (table: string, updatedValues: any) => {	
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
	log(query, fields);
	return await client.query(query, fields);
}

export const update: Function  = async (table: string, updateValues: any, where: any) => {
	let query: string = 'UPDATE'
	query += ' `demo-api`.' + table + ' SET ';
	const fields: string[] = [];

	if (updateValues && Object.keys(updateValues).length !== 0) {
	        let values: string = "";
		for (let key in updateValues) {
                	values += key + ' = ?, ';
			fields.push(updateValues[key]);
		 }
        	query += values.toString().slice(0, -2);
	}
	
	if (where && Object.keys(where).length !== 0) {
	        let values: string = "";
		for (let key in where) {
                	values += (key + ' = ? AND ');
			fields.push(where[key]);
		 }
        	query += ' WHERE ' + values.toString().slice(0, -5);
        }
	log(query, fields);
	return await client.query(query, fields);
}

export const delet: Function = async (table: string, where: any) => {
	
	let query: string = 'DELETE FROM `demo-api`.' + table;

	const fields: string[] = [];
	if (where && Object.keys(where).length !== 0) {
	        let values: string = "";
		for (let key in where) {
                	values += (key + ' = ? AND ');
			fields.push(where[key]);
		 }
        	query += ' WHERE ' + values.toString().slice(0, -5);
        }
	log(query, fields);
	return await client.query(query, fields);
}

const log: Function = (query: string, fields: any) => {
	const id: string = createId();
	console.log('[ QUERY ]'+ ' [ ' +id+ ' ] ' + query);
	console.log('[ FIELDS ]' + ' [ ' +id+ ' ] ' + fields);
}


const createId: Function = (): string => {
	return "" + Math.floor(Math.random()* 9999) + "-" + Math.floor(Math.random()* 9999) + "-" + Math.floor(Math.random()* 9999) + "-" + Math.floor(Math.random()* 9999);  
}
