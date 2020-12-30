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
	return await client.query(query, fields);
}

